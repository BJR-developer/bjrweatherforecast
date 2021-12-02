const { ObjectId } = require("mongodb");
const mongoose=require("mongoose");
const validator=require("validator");
const editschema=new mongoose.Schema({
    work:{
        type:String
    },
    skill:{
        type:String,
    },education:{
       type:String
    },city:{
        type:String
    },email:{
    },relationship:{
        type:String
    },email:{
        type:String
    },number:{
        type:String
    },facebook:{
        type:String
    },linkedin:{
        type:String
    },Instagram:{
        type:String
    },Twitter:{
        type:String
    }
})


const profileEdit=new mongoose.model("UserCollections" , editschema);
module.exports=profileEdit;