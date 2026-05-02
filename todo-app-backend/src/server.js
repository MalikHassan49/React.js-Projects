import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import connectDB from "./db/db.js";

connectDB()
.then(() => {
  app.listen(process.env.PORT || 8400, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
    app.on("error", (error) => {
      console.log(error);
      throw error;
    })
  })
})

.catch((err) => {
  console.log("MongoDB connection failed", err);
})