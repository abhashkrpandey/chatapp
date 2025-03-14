const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./dbmodels/Usermodel");
const ChatModel = require("./dbmodels/Chatschema");
const profileAuthentication = require("./middleware/mw1");
const NotificationModel = require("./dbmodels/Notification");
const path = require('path');//check
const http = require("http");
// const fs =require("fs"); 
const { Server } = require("socket.io");
// const dayjs = require("dayjs");
const app = express();
dotenv.config();
const httpServer = http.createServer(app);

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
];
const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }
}, {
    connectionStateRecovery: {}
});
app.use(cors(
    {
        origin: allowedOrigins,
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
mongoose.connect(process.env.MONGOURL);
app.post("/register", async function (req, res) {
    const username = req.body.userName;
    const password = req.body.password;
    const number = req.body.number;
    const isThere = await UserModel.findOne({ username: username, password: password, number: number });
    if (isThere) {
        res.json({ "message": "already present" });
    }
    else {
        const user = new UserModel({ username: username, password: password, number: number });
        user.save();
        jwt.sign({ username, number }, process.env.SECRETKEY, (err, jwttoken) => {
            if (err) {
                throw err;
            }
            else {
                res.cookie("jwttoken", jwttoken, { maxAge: 86400000,sameSite:"None",secure:true }).json({
                    id: user._id.toString(),
                    uname: user.username,
                });
            }
        });
    }
})
app.get("/profile", profileAuthentication, (req, res) => {
    res.send({ redirect: "/inside" });
})
app.get("/inside", profileAuthentication, async (req, res) => {
    const username = req.decoded.username;
    const number = req.decoded.number;
    const user = await UserModel.findOne({ username: username, number: number });
    if (user == null) {
        res.json({
            message: "Not OK"
        });
    }
    else {
        res.json({
            message: "Ok"
        })
    }
})

app.get("/login", (res, req) => {
    res.send("/login");
})
app.post("/login", async (req, res) => {
    const username = req.body.userNameLogging;
    const password = req.body.passwordLogging;
    const number = req.body.numberLogging;
    const user = await UserModel.findOne({ username, password, number });
    if (user) {
        jwt.sign({ username, number }, process.env.SECRETKEY, (err, jwttoken) => {   //this is done because cookies needs to updated after long time 
            if (err) {
                throw err;
            }
            else {
                res.cookie("jwttoken", jwttoken, { maxAge: 86400000, sameSite:"None",secure:true}).json({
                    id: user._id.toString(),
                    uname: user.username,
                });
            }
        });
    }
    else {
        res.json({ "message": "notvaliduser" });
    }
})
app.post("/totalusers", profileAuthentication, async (req, res) => {
    const users = await UserModel.find({}, { username: 1, _id: 1 });
    const hasNotification = await NotificationModel.find({ recepientid: req.body.recepientid }, { userid: 1, _id: 0 });
    res.json({ allusers: users, allnotification: hasNotification });
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

app.get("/activeusers", profileAuthentication, (req, res) => {
    res.send({ activeUsersdata });
})

app.get("/logout", profileAuthentication, async (req, res) => {
    const username = req.decoded.username;
    const number = req.decoded.number;
    const user = await UserModel.findOne({ username, number });
    res.json({ redirect: "/" });

})
app.get("/signout", profileAuthentication, async (req, res) => {
    const username = req.decoded.username;
    const number = req.decoded.number;
    const user = await UserModel.findOneAndDelete({ username, number });
    res.send({ redirect: "/" });
})
app.post("/chatdata", profileAuthentication, async (req, res) => {
    const userid = req.body.userid;
    const recepientid = req.body.recepientid;
    const chatdata = await ChatModel.find({ $or: [{ userid: userid, recepientid: recepientid }, { userid: recepientid, recepientid: userid }, { userid: userid, recepientid: userid }] }, { createdAt: 1, message: 1, _id: 1, userid: 1, recepientid: 1 }).lean();
    chatdata.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const convertedtime = createdAt.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
        const converteddate = createdAt.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
        const _id = item._id.toString();
        item._id = _id;
        item.messageDate = converteddate;
        item.messageTime = convertedtime;
    })
    res.json({ chat: chatdata });
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const activeusers = [];

io.on("connection", (socket) => {
    socket.on("request-active-users", () => {
        io.emit("all-online-users", { activeUsers: activeusers });
    })
    socket.on("join-own-room", (args) => {
        if (!activeusers.includes(args.roomid)) {
            activeusers.push(args.roomid);
        }
        socket.join(args.roomid);
        socket.data.userid = args.roomid;
        io.emit("all-online-users", { activeUsers: activeusers });
    });

    socket.on("mess", async (args) => {
        try {
            const chat = new ChatModel({
                recepientid: args.recepientid,
                userid: args.userid,
                message: args.msg,
            });
            await chat.save();
            //     const isPresent = await NotificationModel.findOne({ recepientid: args.recepientid });
            //     if (isPresent) {
            //         if(!isPresent.userid.includes(args.userid))
            //         {
            //         await NotificationModel.updateOne({ recepientid: args.recepientid },
            //             {
            //                 $push:
            //                 {
            //                     userid: args.userid
            //                 }
            //             }
            //         )
            //     }
            // }
            // else {
            const notification = new NotificationModel({
                userid: args.userid,
                recepientid: args.recepientid,
                chatid: chat._id
            })
            await notification.save();
            // }

            const somedate = new Date();
            const convertedtime = somedate.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
            const converteddate = somedate.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });

            io.to(args.recepientid).emit("new-notification",
                {
                    userid: args.userid,
                    recepientid: args.recepientid
                }
            );

            io.to(args.recepientid).to(args.userid).emit("message-from-server", {
                message: args.msg,
                userid: args.userid,
                recepientid: args.recepientid,
                messageDate: converteddate,
                messageTime: convertedtime,
                _id: chat._id,
            });
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("message-read-id", async (args) => {
        const chatarray = args.ids;
        for (let i = 0; i < chatarray.length; i++) {
            await NotificationModel.findOneAndDelete({ chatid: chatarray[i] });
        }
        const isThereAnyChatUnReadLeft = await NotificationModel.findOne({ userid: args.recepientid,recepientid:args.userid});
        // console.log(isThereAnyChatUnReadLeft);
        if (isThereAnyChatUnReadLeft === null) {
            // console.log("efewf");
            io.to(args.userid).emit("all-chats-are-read",
                {
                    "recepientid": args.recepientid
                }
            );
        }
    });
    socket.on("disconnect", () => {
        if (socket.data.userid) {
            const index = activeusers.indexOf(socket.data.userid);
            if (index !== -1) {
                activeusers.splice(index, 1);
            }
            io.emit("all-online-users", { activeUsers: activeusers });
        }
    });
});


httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port:${process.env.PORT}`);
});
