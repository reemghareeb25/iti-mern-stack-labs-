const User = require("../models/user");
const Todo = require("../models/toDo");

async function createTodo(req, res) {
  try {
    const { username, title, tags } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newTodo = new Todo({
      userId: user._id,
      title,
      tags,
    });
    await newTodo.save();
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTodos(req, res) {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function editTodo(req, res) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {
      new: true,
    });
    res.json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteTodo(req, res) {
  try {
    await Todo.findByIdAndDelete(req.params.todoId);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
};
