import express from "express";
import { addTodo, deleteTodo, updateTodo, getTodos } from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/add-todo").post(addTodo);
router.route("/:todoId/update-todo").put(updateTodo);
router.route("/:todoId/delete-todo").delete(deleteTodo);
router.route("/get-todos").get(getTodos);

export default router;


