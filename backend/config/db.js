const mongoose = require("mongoose");

const mongodbURL= process.env.MONGODB_URI ||"mongodb://localhost:27017/busgo";

const connectDB= async()=>{
  try {
    await mongoose.connect(mongodbURL);
    console.log("connected to mongodb server");
  }catch(error){
    console.log(error);
    process.exit(1);
  }
};
module.exports=connectDB;