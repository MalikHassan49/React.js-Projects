import mongoose from "mongoose"


const connectDB = async (req, res) => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    // console.log("MongoDB connected: ", connectionInstance);
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
}

export { connectDB }