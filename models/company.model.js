import mongoose from "mongoose";
const comanySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
        // required:true
    },
    location:{
        type:String,
        // required:true
    },
    logo:{
        type:String//url to company logo

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

export const Company=mongoose.model("Company",comanySchema);