const mongoose=require("mongoose");


// const UserSchema=new mongoose.Schema(
//     {
//         username:String,
//         password:String
//     }
// )

const UserModel=mongoose.model("Users",{username:String,password:String,number:Number});

module.exports=UserModel;