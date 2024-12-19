const express = require("express");

const router = express.Router();

const todoController = require("../controller/toDoController");

router.post("/createTodo", todoController.createTodo);

router.get("/getTodos:userId", todoController.getTodos);

router.put("/editTodo:todoId", todoController.editTodo);

router.delete("/deleteTodo:todoId", todoController.deleteTodo);

module.exports = {
    router
};
  