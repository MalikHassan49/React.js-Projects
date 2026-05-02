import mongoose, { model, Schema } from "mongoose";

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true })

export const Todo = mongoose.model("Todo", todoSchema);