const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./dbmodels/Usermodel");
const ChatModel =require("./dbmodels/Chatschema");
const profileAuthentication = require("./middleware/mw1");
const https = require("https");
const http=require("http");
const fs =require("fs");
const { Server } = require("socket.io");
const dayjs = require("dayjs");
const app = express();
let activeUsersdata = [];
let allusersdata=[];
let currentusername;
let currentuid;
let currentunumber;
let flag=1;
dotenv.config();
const options = {
    key: fs.readFileSync('../private.key'), // Path to your private key
    cert: fs.readFileSync('../certificate.crt') // Path to your SSL certificate
};
const httpsServer = https.createServer(options,app);
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
});
const io = new Server(httpsServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }
},{
    connectionStateRecovery: {}
});
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
mongoose.connect(process.env.MONGOURL);
app.post("/register", async function (req, res) {
    const username = req.body.userName;
    const password = req.body.password;
    const number=req.body.number;
    const user = new UserModel({ username: username, password: password,number:number});
    user.save();
   // console.log(user);
    currentusername=user.username;
    currentuid=user._id.toString();
    currentunumber=user.number;
    jwt.sign({ username,number}, process.env.SECRETKEY, (err, token) => {
        if (err) {
            throw err;
        }
        else {
            res.cookie("token", token,{maxAge:86400000}).json({
                id: currentuid,
                uname: currentusername,
                number:currentunumber
            });
        }
    });
})
app.get("/profile", profileAuthentication, (req, res) => {
    res.send({ redirect: "/inside" });
})
app.get("/inside",profileAuthentication,async(req,res)=>
{
    const username=req.decoded.username;
    const number=req.decoded.number;
    const user=await UserModel.findOne({username,number});
    currentusername=user.username;
    currentuid=user._id.toString();
    currentunumber=user.number;
    res.json({
        id: currentuid,
        uname:currentusername,
        number:currentunumber,
    });
})
app.post("/login", async (req, res) => {
    const username = req.body.userNameLogging;
    const password = req.body.passwordLogging;
    const number=req.body.numberLogging;
    const user = await UserModel.findOne({ username, password ,number});
    if (user) {
    currentusername=user.username;
    currentuid=user._id.toString();
    currentunumber=user.number;
        jwt.sign({ username ,number}, process.env.SECRETKEY, (err, token) => {   //this is done because cookies needs to updated after long time 
            if (err) {
                throw err;
            }
            else {
                res.cookie("token", token,{maxAge:86400000}).json({
                    id: currentuid,
                    uname:currentusername,
                    number:currentunumber,
                });
            }
        });
    }
    else {
        res.send({ redirect: "/notvaliduser" });
    }
})
async function alluserfinder()
{
   allusersdata=await UserModel.find({},{username:1});
//    console.log(allusersdata);
}
app.get("/totalusers",profileAuthentication,(req,res)=>
{
    alluserfinder();
    res.send({allusersdata});
})
app.post("/user", profileAuthentication, async (req, res) => {
    const name = req.body.sname;
    const user = await UserModel.find({ username: name });
    if (user.length != 0) {
        res.send(
            user.map((ele) => {
                return { uname: ele.username, uid: ele._id.toString() }
            }
            )
        );
    }   
})

app.get("/activeusers",profileAuthentication,(req,res)=>
{
   // console.log(activeUsersdata[0].uid.toString());
     res.send({activeUsersdata});
})

app.get("/logout",profileAuthentication,async(req,res)=>
{
    const username=req.decoded.username;
    const number=req.decoded.number;
    const user=await UserModel.findOne({username,number});
   // currentusername=user.username;
    currentuid=user._id.toString();
   // currentunumber=user.number;
    activeUsersdata=activeUsersdata.filter(person=>person.userid!=currentuid);
    console.log(activeUsersdata);
    res.send({redirect:"/"});

})
app.get("/signout",profileAuthentication,async(req,res)=>
{
    const username=req.decoded.username;
    const number=req.decoded.number;
    const user=await UserModel.findOne({username,number});
    currentusername=user.username;
    currentuid=user._id.toString();
    currentunumber=user.number;
    activeUsersdata=activeUsersdata.filter(person=>person.userid!=currentuid);
    await UserModel.deleteMany({_id:currentuid});
    res.send({redirect:"/"});
})
app.post("/chatdata",profileAuthentication,async (req,res)=>
{
    const converteduid= new mongoose.Types.ObjectId(req.body.uid);
    const convertedrecepientid=new mongoose.Types.ObjectId(req.body.recepietid);
    const chatdata=await ChatModel.find({$and:[{$or:[{senderid:convertedrecepientid},{receiverid:convertedrecepientid}]},{$or:[{senderid:converteduid},{receiverid:converteduid}]}]},{data:1,receiverid:1,senderid:1,createdAt:1});
    res.json(chatdata);
})
io.on("connection", (socket) => {
    //console.log(socket.id);
   // console.log(activeUsersdata);
   socket.on("status",(args)=>{
    let currentUserIndex = activeUsersdata.findIndex(user => user.userid === args.uid);

    if (currentUserIndex !== -1) {
        activeUsersdata[currentUserIndex].socketid = socket.id;
        activeUsersdata[currentUserIndex].status="true";
        currentuid="";
        currentusername="";
        currentunumber="";
        //console.log(`User ${currentusername} reconnected with new socket ID: ${socket.id}`);
    } else 
    if(currentusername && currentuid && currentunumber) {
    
        activeUsersdata.push({"uname": currentusername, "userid": currentuid,"usernumber":currentunumber,"status":true,"socketid":socket.id});
        console.log("A new user connected");
    }
    
        io.emit("online",{"activeUsersdata":activeUsersdata});
    })

    socket.on("mess", (args) => {
       // console.log(args);
        let recipient=""; 
        for(let i=0;i<allusersdata.length;i++)
        {
            if(args.recepietid==allusersdata[i]._id.toString())
            {
                recipient=allusersdata[i];
            }
        }
        if (recipient!="") {
            //const date = new Date();
            const chat = new ChatModel({ receiverid:args.recepietid,senderid:args.senderid,data:args.msg});
            chat.save();
            socket.to(recipient.socketid).emit("server-respo", args);
        } else {
            console.log("Recipient not found");
        }
    });

    socket.on("disconnect", () => {
        console.log(`User ${currentusername} disconnected`);
        activeUsersdata = activeUsersdata.filter(user => user.socketid !== socket.id);
        io.emit("change",({"activeUsersdata":activeUsersdata}));
    });
});


httpsServer.listen(process.env.PORT, () => {
    console.log(`Server running on port:${process.env.PORT}`);
});
httpServer.listen(80, () => {
    console.log("HTTP server is running on port 80 and redirects to HTTPS");
});