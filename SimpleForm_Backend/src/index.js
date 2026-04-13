import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./db/db.js"
dotenv.config({ path: "./.env" })

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5500, () => {
      console.log(`Server is listening on PORT ${process.env.PORT}`);
      app.on("error", (error) => {
        console.log("ERROR", error);
        throw error;
      })
    })
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  })