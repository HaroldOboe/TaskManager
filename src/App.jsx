import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const updateTask = (index) => {
    if (editText.trim() !== "") {
      setTasks(
        tasks.map((t, i) => (i === index ? { ...t, text: editText } : t))
      );
    }
    setEditingIndex(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div
      className={`min-h-screen p-5 transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Manager App</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition"
        >
          {darkMode ? <LuSun /> : <LuMoon />}
        </button>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          className="p-2 border rounded w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={addTask}
          disabled={!task.trim()}
        >
          Add Task
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="px-3 py-1 bg-gray-500 text-white rounded"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded"
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {filteredTasks.map((t, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-3 rounded ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            {editingIndex === index ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => updateTask(index)}
                onKeyDown={(e) => e.key === "Enter" && updateTask(index)}
                autoFocus
                className="p-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <span
                className={`${
                  t.completed ? "line-through opacity-50" : ""
                } transition cursor-pointer`}
                onDoubleClick={() => startEditing(index)}
              >
                {t.text}
              </span>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(index)}
                className="w-5 h-5 accent-blue-500"
              />
              <button
                onClick={() => deleteTask(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
