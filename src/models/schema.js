const { ObjectId } = require("mongodb");
const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    _id:{
        type:ObjectId
    },
    fullname:{
        type:String,
        minlength:6,
        required:true,
    },email:{
       type:String,
       required:true,
    },password:{
        type:String,
    required:true,
    },
    work:{
        type:String,
        default:"N/A"
    },
    skill:{
        type:String,
        default:"N/A"
    },education:{
       type:String,
       default:"N/A"
    },city:{
        type:String,
        default:"N/A"
    },email:{
    },relationship:{
        type:String,
        default:"N/A"
    },number:{
        type:String,
        required:true,
        default:"N/A"
    },facebook:{
        type:String,
    },linkedin:{
        type:String,
    },instagram:{
        type:String,
    },twitter:{
        type:String,
    },
    bio:{
        type:String,
    },tokens:[{
        
    }]
});

const UserModel=new mongoose.model("UserCollections" , userSchema);
module.exports=UserModel;