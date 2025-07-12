import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectDB = async () => {
  try {
    console.log("Processing .env.....",process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
    console.log(`Connected to MongoDB successfully`.bgGreen.white)
  } catch (error) {
    console.log(`MongoDB Error 123: ${error}`.bgRed.white)
  }
}

export default connectDB