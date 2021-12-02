require('dotenv').config();
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const UserModel=require("../src/models/schema");
// const editschema=require("../src/models/edit")
const path=require('path');
const hbs=require("hbs");
const port=process.env.PORT || 3000;
const staticPath=path.join(__dirname, "./templates/views");
const partialPath=path.join(__dirname , "./templates/partials");
const router=new express.Router();
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const requests=require("requests"),
      got     =require("got")
app.use(cookieParser())
const auth=require('./middleware/auth')
const bson = require("bson")
require("./db/connection");
require("../src/models/schema");
const mailer= require("../src/mail/mailer");
const { request } = require('http');
const { response } = require('express');
app.set("views" , staticPath );
app.set("view engine" , "hbs");
hbs.registerPartials(partialPath);
app.use(express.json());
app.use(router);
app.use(express.urlencoded({extended:false}))
router.use(express.urlencoded({extended:false}))













  
  // Home page condition

  //get all of the time jSOn Data
  //transferAPI Informotion to homepage
  //search field request
  router.get('/', function (req, res) {
    const cookie=req.cookies
    const cookiecheck=cookie.userCookies
    let city=req.query.city;

    if(city==""){
      city="Dhaka"
    }
    if(req.url=="/"){
      city="Dhaka"
    }
 

requests(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4183ad67939026b21a012f65ac97348`)
.on('data', function (chunk) {
    const objData=JSON.parse(chunk);


  if(cookiecheck){
    res.render('mainpage.hbs' ,objData)
  }else{
    res.render('index.hbs' , objData)
  }
  });

  router.post("/city_name" , (req,res)=>{
    const name= req.body.cityname;
    res.writeHead(301,
      {Location: `http://localhost:3000/?city=${name}`}
    );
    res.end();
       });

 });
   
      router.get("/account" , auth , (req,res)=>{
          const cookie=req.cookies
            const cookiecheck=cookie.userCookies
          res.render("account" , cookiecheck)
        });
       

  //contact us page

  router.get("/contact" , (req,res)=>{
    res.render("contactus")
  })
 
  router.get("/blog" , (req,res)=>{
    res.render("blog")
  })
  router.get("/weatherforecast" , (req,res)=>{
    res.render("weatherforecast")
  })

  //contact page post method to mail

  router.post("/contact" , (req,res)=>{
try {
  
  let fromMail="bjrprogamer@gmail.com"
    let toMail="bjrprogamer@gmail.com"
    let sub="BJR Weather Forecast"
    let text=req.body.message
    let clientEmail=req.body.email
    let fullName=req.body.name

   const mailoption= {
     from:fromMail,
     to:toMail,
     subject:sub,
     text:`Name: <b> ${fullName}</b> </br> Gmail: ${clientEmail} </br> ${text} </br> Sincerely Yours, </br> <b> ${fullName}</b>.`
   }
   mailer.transporter.sendMail(mailoption , (err,res)=>{
    if(err){
      console.log(err)
    }else{
      console.log(res)
    }
   });
   res.redirect("/")

} catch (error) {
  console.log(error)
}
   
  });
  
   //profile edit method

  router.post("/profileEdit" , async(req , res)=>{ 
    try {
      const cookies=req.cookies
      const usercookies=cookies.userCookies
      console.log(usercookies);
      const userid=usercookies._id
      const a=req.body;
      const details={
        "work":a.work,
        "skill":a.skill,
        "education":a.education,
        "address":a.city,
        "city":a.hobby,
        "relationship":a.relationship,
        "email":a.email,
        "number":a.number,
        "facebook":a.facebook,
        "linkedin":a.linkedin,
        "instagram":a.instagram,
        "twitter":a.twitter
      };
      const ress = await UserModel.updateMany({_id:userid} , {"$set" :details } , { upsert: true} , (err ,data)=>{
        if (err){
          console.log(err)
        }else{
          console.log(data + " Data Inserted Succesfully")
          res.redirect('/account')
        }
      }).clone()
    } catch (error) {
      console.log(error + "not submitted..please try again");
      res.render("account")
    }
  })


  // signup your account

  router.post("/signup" , (req,res)=>{

    const signupdetails=async()=>{
      try{
        const pass=req.body.password;
        const cpass=req.body.cpassword;
        
         
        const confirmpass=async()=>{
          try{
            if (pass==cpass) {
            const salt=await bcrypt.genSalt(10)
            const hashpass= await bcrypt.hash(pass,salt)
            let id =  bson.ObjectID();
              console.log("this is the first object id " + id);
            let data = {
              _id:id
            }
            let token= jwt.sign(data , process.env.SECRET_KEY)
            console.log("this is the first token" + token)
              const userinfo=   new UserModel({
                "_id":id,
                "fullname":req.body.full_name,
                "email":req.body.email,
                "password":hashpass,
                "tokens":token
            });
            
            await UserModel.insertMany(userinfo , (err, data)=>{
              if(err){
                  console.log(err)
              }else{ 
                console.log("Record inserted Successfully" + data);
                res.cookie("userCookies" , data)
              return res.render('mainpage');
 
           }
           });
            }else{
              res.render("signup")
            }
            
          }catch(e){
            console.log(e);
            res.send("invalid Validation")
          }
        }
        confirmpass();
        
      }catch(e){
          console.log(e);
          res.send("invalid Validation")
      }
    };
    signupdetails();
    
});

 //login form page
 router.get("/login" , (req, res)=>{
   res.render("login")
 })

router.post("/login" , async(req,res)=>{
  try {
    var email=req.body.email;
    var password=req.body.password;
    const dbfromemail=await UserModel.findOne({email:email});
    const emailval=dbfromemail.email;
    const passval=dbfromemail.password;
    if (email==emailval){
      bcrypt.compare(password, passval, function(err, result) {
       if(result){
         console.log(result)
         res.cookie("userCookies" , dbfromemail , {
           expires:new Date(Date.now()+ 300000),
           httpOnly:true
         })
         res.redirect("/")
         app.get("/" , (req,res)=>{
          res.render("mainpage")
         })
       }else{
        res.render("login")
       } 
    });
     
    }
  } catch (error) {
    console.log(error + "email not matching....please create your account first");
    res.send("You did not create any account pleasae....<a href='/signup'>Create an account</a> Or <a href='/login'>Login Again</a>")
  }
 
})

//logout sesson

router.get("/logout"  ,  async(req,res)=>{
  try {
    const userData = req.cookies.userCookies;
    console.log(userData.tokens)
     res.clearCookie("userCookies")
  console.log("Logout succesfully")
  res.redirect("/")
  } catch (error) {
    console.log(error)
  }
  
});
//server port
app.listen(port , async()=>{
   try{
    console.log("Server Listening to 3000 Port")
   } catch(e){
    console.log(e);
   }
});