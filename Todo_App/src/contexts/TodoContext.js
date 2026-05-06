import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todoTitle: "todo msg",
      completed: false
    }
  ],
  addTodo: (todoTitle) => {},
  updateTodo: (todoTitle, id) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {}
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
  return useContext(TodoContext);
}

