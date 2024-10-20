import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        // await mongoose.connect(`mongodb+srv://omi:omkar@cluster0.9q3tm.mongodb.net/`)
        // await mongoose.connect(`mongodb+srv://akshay:akshay15@cluster0.xmgi3.mongodb.net/`);
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\nMongoDB connected ! DB Host `)
        console.log("connected");
    
    }
    catch(error){
        console.log("mongodb connection error",error);
        
    }
}

export default connectDB;