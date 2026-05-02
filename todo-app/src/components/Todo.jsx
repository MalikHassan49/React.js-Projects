import { useEffect, useState } from 'react'
import axios from "axios";
import "./Todo.css";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get(`http://localhost:8400/api/v1/todos/get-todos`);
        console.log(response);
        console.log(response.data);
        if (response.data.success) {
          setTodos(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodos();
  }, [])



  async function handleAddAndUpdateTodo() {
    // check if todo is empty
    if (todo === "") return;

    // if todo is edit
    if (editingId !== null) {
      try {
        const response = await axios.put(`http://localhost:8400/api/v1/todos/${editingId}/update-todo`,
          {
            todoText: todo
          }
        );

        const updatedTodos = todos.map(item => item._id === editingId ? response.data.data : item);
        setTodos(updatedTodos);
        setEditingId(null);
      } catch (error) {
        console.log(error);
      }
    }

    // todo is added
    else {
      try {
        const response = await axios.post(`http://localhost:8400/api/v1/todos/add-todo`, {
          todoText: todo
        });

        setTodos([...todos, response.data.data]);
      } catch (error) {
        console.log(error);
      }
    }
    setTodo("");
  }

  function handleEditTodo(id) {
    const todoItem = todos.find(i => i._id === id);
    setTodo(todoItem.todo);
    setEditingId(id);
  }

  async function handleDeleteTodo(id) {
    try {
      const response = await axios.delete(`http://localhost:8400/api/v1/todos/${id}/delete-todo`);
      console.log("Response Data: ", response);
      const updatedTodosArr = todos.filter(item => item._id != id);
      setTodos(updatedTodosArr);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='main-heading-container'>
        <p>TodoApp</p>
      </div>
      <main>
        <div className='input-container'>
          <input
            className='search-box'
            type="text"
            value={todo}
            placeholder='Enter todo'
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          {
            editingId !== null ? (
              <button className='save-btn' onClick={handleAddAndUpdateTodo}>💾</button>
            ) : (
              <button className='add-btn' onClick={handleAddAndUpdateTodo}>➕</button>
            )
          }
        </div>
        {/* create todos */}
        <div>
          {
            todos.map((item) => (
              <div className='todos' key={item._id}>
                <input className='todo-container' value={item.todo} readOnly />
                <button
                  className='pencil-emoji'
                  onClick={() => (
                    handleEditTodo(item._id)
                  )}
                >✏️</button>

                <button className='trash-emoji' onClick={() => {
                  handleDeleteTodo(item._id)
                }}>🗑️</button>
              </div>
            ))
          }
        </div>
      </main>
    </>
  )
}

export default Todo