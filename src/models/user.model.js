import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","requiter"],
        required:true
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[{type:String}],
        resume:{type:String},//urrl to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.type.ObjectId,
            ref:"Company"},
        profilePhoto:{
            type:String,
            default:""
        }

    }
})