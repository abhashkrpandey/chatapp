const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    userid: { type:String, required: true },
    recepientid: { type:String, required: true },
    message: { type: String, required: true },
}, 
{ timestamps: true }); 

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
