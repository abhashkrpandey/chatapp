const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./dbmodels/Usermodel");
const profileAuthentication = require("./middleware/mw1");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
let activeUsersdata = [];
dotenv.config();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }
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
    const user = new UserModel({ username: username, password: password });
    user.save();
    jwt.sign({ username }, process.env.SECRETKEY, (err, token) => {
        if (err) {
            throw err;
        }
        else {
            res.cookie("token", token,).json({
                id: user._id,
                uname: user.username
            });
        }
    });
    connector(username, user._id, io);
})
app.get("/profile", profileAuthentication, (req, res) => {
    res.send({ redirect: "/profile" });
})
app.post("/login", async (req, res) => {
    const username = req.body.userNameLogging;
    const password = req.body.passwordLogging;
    const user = await UserModel.findOne({ username, password });
    if (user.length != 0) {
        jwt.sign({ username }, process.env.SECRETKEY, (err, token) => {   //this is done because cookies needs to updated after long time 
            if (err) {
                throw err;
            }
            else {
                res.cookie("token", token).json({
                    id: user._id,
                    uname: user.username
                });
            }
        });
    }
    else {
        res.send({ redirect: "/login" });
    }
    connector(username, user._id, io);
})

app.post("/user", profileAuthentication, async (req, res) => {
    const name = req.body.sname;
    const user = await UserModel.find({ username: name });
    if (user.length != 0) {
        res.send(
            user.map((ele) => {
                return { uname: ele.username, uid: ele._id }
            }
            )
        );
    }   
})

app.get("/activeusers",profileAuthentication,(req,res)=>
{
    console.log(activeUsersdata);
     res.send({activeUsersdata});
})

function connector(uname, uid, io) {
    let flag=1;
    io.on("connection", (socket) => {
        for(let i=0;i<activeUsersdata.length;i++)
        {
            if(activeUsersdata[i].uid===uid)
            {
                 flag=0;
            }
        }
        if(flag==1)
        {
            activeUsersdata.push({ "socketid": socket.id, "uname": uname, "uid": uid });
            console.log("A user connected");
        }

        socket.on("mess", (args) => {
             console.log(args);
            socket.join(args.recepientsocketid);
            socket.to(args.recepientsocketid).emit("server-respo", args);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
            activeUsersdata = activeUsersdata.filter((user) => user.socketid !== socket.id);
            // console.log(activeUsersdata); 
        });
    });
    flag=1;
}


httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port:${process.env.PORT}`);
});