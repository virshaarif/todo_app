

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
// import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api/todos";

const fetchTodos = async () => {
  const res = await fetch(API_BASE);
  const data = await res.json();
  return data;
};

const addTodoToServer = async (todoText) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: todoText }),
  });
  return await res.json();
};

const updateTodoOnServer = async (_id, updatedData) => {
  const res = await fetch(`${API_BASE}/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return await res.json();
};

const deleteTodoFromServer = async (_id) => {
  await fetch(`${API_BASE}/${_id}`, {
    method: "DELETE",
  });
};

function App() {
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };
    loadTodos();
  }, []);

  const handleEdit = async (e, _id) => {
    const t = todos.find((item) => item._id === _id);
    setTodo(t.todo);
    await deleteTodoFromServer(_id);
    setTodos(todos.filter((item) => item._id !== _id));
  };

  const handleDelete = async (e, _id) => {
    await deleteTodoFromServer(_id);
    setTodos(todos.filter((item) => item._id !== _id));
  };

 const handleAdd = async () => {
  console.log("Save button clicked"); // ✅ Add this
  if (!todo.trim()) return;

  const newTodo = await addTodoToServer(todo.trim());
  setTodos([...todos, newTodo]);
  setTodo("");
};
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = async (e) => {
    const _id = e.target.name;
    const index = todos.findIndex((item) => item._id === _id);
    const updatedTodo = {
      ...todos[index],
      isCompleted: !todos[index].isCompleted,
    };
    await updateTodoOnServer(_id, updatedTodo);
    const newTodos = [...todos];
    newTodos[index] = updatedTodo;
    setTodos(newTodos);
  };

  const filteredTodos = showFinished
    ? todos.filter((t) => t.isCompleted)
    : todos;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-xl rounded-xl mt-6 min-h-[80vh]">
        {/* Add Todo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-violet-700 mb-3 text-center md:text-left tracking-wide">
            📝 Add a New Task
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleAdd}
              disabled={!todo.trim()}
              className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-all"
            >
              Save
            </button>
          </div>
        </div>

        {/* Toggle Finished */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-violet-700">Your Todos</h2>
          <button
            onClick={() => setShowFinished(!showFinished)}
            className="text-sm bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {showFinished ? "Show All Todos" : "Show Finished Only"}
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No Todos to display
            </p>
          ) : (
            filteredTodos.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item._id}
                    className="w-5 h-5 text-violet-600 rounded"
                  />
                  <span
                    className={`text-gray-800 ${
                      item.isCompleted ? "line-through opacity-60" : ""
                    }`}
                  >
                    {item.todo}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleEdit(e, item._id)}
                    className="text-sm px-3 py-1 rounded-md bg-violet-500 hover:bg-violet-600 text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item._id)}
                    className="text-sm px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
