import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add new todo
router.post("/", async (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo({ todo });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// Update todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, isCompleted } = req.body;
  const updated = await Todo.findByIdAndUpdate(id, { todo, isCompleted }, { new: true });
  res.json(updated);
});

// Delete todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
