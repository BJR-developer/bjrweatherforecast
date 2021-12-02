const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const UserModel=require("../src/models/schema");
const path=require('path');
const hbs=require("hbs");
const port=process.env.PORT || 3000;
const staticPath=path.join(__dirname, "./templates/views");
const partialPath=path.join(__dirname , "./templates/partials");
require("./db/connection");
require("../src/models/schema");
const bodyParser=require("body-parser");
app.set("views" , staticPath );
app.set("view engine" , "hbs");
hbs.registerPartials(partialPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}))