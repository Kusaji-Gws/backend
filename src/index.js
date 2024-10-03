// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import mongoose from "mongoose";
import connectDB from "./db/db_connection.js";
import express from 'express';
const app=express();
dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongodb connection failed",err)
})


























/*
import express from 'express'
const app=express()
(async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("Error",error)
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`app is listen on port ${process.env.PORT}`)
       })
    }
    catch(error){
        console.log("error",error)
        throw error;
    }
})()
*/