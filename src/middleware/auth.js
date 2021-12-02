require('dotenv').config();
const jwt=require("jsonwebtoken"),
    cookieParser=require("cookie-parser"),
    UserModel=require("../models/schema")
    const express=require("express");
const app=express();
    app.use(cookieParser())

//cookies meaning user Collections Data save on browser
 const auth=async( req,res,next)=>{
     try {
        const userData = req.cookies.userCookies;
        console.log(userData);
        console.log(userData.tokens)
        const verify=await jwt.verify(userData.tokens[0] , process.env.SECRET_KEY);

       if(!verify){
        app.get("/" , (req,res)=>{
            res.render("index")
        })
       }else{
        app.get("/" , (req,res)=>{
            res.render("mainpage")
        })
       }
       
        // console.log(verify + jwt);
        next()
     } catch (error) {
         console.log("this is the auth problem " + error)
         return res.render("login")
     }
     
 }
 
 module.exports=auth;