import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  summary,
} from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);
router.get("/summary", summary);

export default router;
