import mongoose from 'mongoose'


export async function connectDB(mongodb_url){
    await mongoose.connect(mongodb_url)
    console.log("Successfully connected to mongodb");
    
}