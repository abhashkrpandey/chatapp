const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    senderid: { type: mongoose.ObjectId, required: true },
    receiverid: { type: mongoose.ObjectId, required: true },
    data: { type: String, required: true }
}, 
{ timestamps: true }); 

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = ChatModel;
