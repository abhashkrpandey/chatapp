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



dotenv.config();

const app = express();

app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
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

})

app.get("/profile", profileAuthentication, (req, res) => {
    res.send({ redirect: "/profile" });
})

app.post("/login", async (req, res) => {
    const username = req.body.userNameLogging;
    const password = req.body.passwordLogging;
    const user = await UserModel.find({ username, password });
    if (user.length != 0) {
        jwt.sign({ username }, process.env.SECRETKEY, (err, token) => {
            if (err) {
                throw err;
            }
            else {
                res.cookie("token", token).json({
                    id: user[0]._id,
                    uname: user[0].username
                });
            }
        });
    }
    else {
        res.send({redirect:"/login"});
    }
})

   
app.listen(process.env.PORT, () => {
    console.log(`Server running on port:${process.env.PORT}`);
})