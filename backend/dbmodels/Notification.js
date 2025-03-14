const mongoose=require("mongoose");

const NotificationSchema=new mongoose.Schema(
    {
        userid:{type:String,required:true},
        recepientid:{type:String,required:true},
        chatid:{type:String,required:true}
    },
    {timestamps:true}
)
const NotificationModel=mongoose.model("notification-model",NotificationSchema);

module.exports=NotificationModel;