import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json({ limit: '16kb' })); // for json data
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // for form data (username=Hassan&age=22)

// import routes
import TodoRouter from "./routes/todo.routes.js";

// routes declaration
app.use("/api/v1/todos", TodoRouter);

export { app }