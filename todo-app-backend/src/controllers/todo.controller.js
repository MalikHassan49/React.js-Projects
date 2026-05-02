import { Todo } from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addTodo = asyncHandler(async (req, res) => {
  console.log("Add Todo API HIT!!");
  const { todoText } = req.body;

  if (!todoText) {
    throw new ApiError(400, "Todo is required!!");
  }

  const alreadyExistTodo = await Todo.findOne({
    todo: todoText
  });

  if (alreadyExistTodo) {
    throw new ApiError(400, "Todo already exist!!");
  }

  const todos = await Todo.create({
    todo: todoText
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        todos,
        "Todo created successfully"
      )
    )
})

const deleteTodo = asyncHandler(async (req, res) => {
  console.log("Delete API HIT!!");
  const { todoId } = req.params;

  const todos = await Todo.findByIdAndDelete(todoId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        todos,
        "Todo deleted successfully!"
      )
    )
})

const updateTodo = asyncHandler(async (req, res) => {
  console.log("Update Todo API HIT!!");
  const { todoId } = req.params;
  console.log("TodoId: ", todoId);
  const { todoText } = req.body;
  console.log("Todo Text: ", todoText);

  const todos = await Todo.findByIdAndUpdate(todoId,
    {
      $set: {
        todo: todoText
      }
    },
    {
      returnDocument: "after"
    })

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        todos,
        "Todo updated successfully"
      )
    )
})

const getTodos = asyncHandler(async (req, res) => {
  console.log("get todos API HIT!!");
  const todos = await Todo.find({});

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      todos,
      "All todos fetched successfully"
    )
  )
})

export {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos
}