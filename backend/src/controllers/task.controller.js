import {
  createTaskRecord,
  findTasksForUser,
  changeTaskStatus,
  removeTask,
  getDailySummary,
} from "../services/task.service.js";

export const createTask = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Task name is required" });
    }

    const task = await createTaskRecord({
      userId: req.user.userId,
      name,
      description,
    });

    res.status(201).json({
      taskId: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { date } = req.query;
    const tasks = await findTasksForUser({ userId: req.user.userId, date });
    if (tasks === null) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    res.json(
      tasks.map((task) => ({
        taskId: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
      }))
    );
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ error: "Status must be 'pending' or 'completed'" });
    }

    const task = await changeTaskStatus({ id, userId: req.user.userId, status });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      taskId: task._id,
      name: task.name,
      description: task.description,
      status: task.status,
      updatedAt: task.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await removeTask({ id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const summary = async (req, res, next) => {
  try {
    const { date } = req.query;
    const summaryResult = await getDailySummary({ userId: req.user.userId, date });
    if (!summaryResult) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    res.json(summaryResult);
  } catch (error) {
    next(error);
  }
};
