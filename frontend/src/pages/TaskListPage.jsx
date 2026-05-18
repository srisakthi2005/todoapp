import { useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from "../services/task.service.js";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const data = await fetchTasks(new Date().toISOString().slice(0, 10));
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || "Could not load tasks.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Task name is required.");
      return;
    }

    try {
      await createTask(form);
      setForm({ name: "", description: "" });
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || "Could not create task.");
    }
  };

  const toggleStatus = async (task) => {
    try {
      await updateTaskStatus(task.taskId, task.status === "pending" ? "completed" : "pending");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || "Could not update task status.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {
      await deleteTask(taskId);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || "Could not delete task.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>My Tasks</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Task name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} rows="3" />
          </div>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="card">
        <h3>Task List</h3>
        {tasks.length === 0 ? (
          <p>No tasks created for today.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.taskId} className="task-item">
              <div>
                <strong>{task.name}</strong>
                <div className={`status-badge status-${task.status}`}>{task.status}</div>
                {task.description && <p>{task.description}</p>}
              </div>
              <div className="task-actions">
                <button type="button" onClick={() => toggleStatus(task)} className="secondary">
                  Mark {task.status === "pending" ? "Completed" : "Pending"}
                </button>
                <button type="button" onClick={() => handleDelete(task.taskId)} className="secondary">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
