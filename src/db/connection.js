const mongoose=require("mongoose");
const UserModel=require("../models/schema");
const express=require("express");
const app=express();
app.use(express.json());


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/userdb`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();