import mongoose from "mongoose";



export const dbConn = mongoose.connect('mongodb://localhost:27017/E-commerce').then(()=>{
    console.log('Database Connected Successfyly');
}).catch(()=>{
    console.log('Database Not Connected');
})