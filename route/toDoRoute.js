const express = require("express");
const {
  createToDos,
  getTodos,
  deleteToDo,
  updateToDo,
  editToDo,
} = require("../controller/toDoController");

const router = express.Router();

router.post("/createTodos", createToDos);
router.get("/getTodos", getTodos);
router.delete("/deleteToDo", deleteToDo);
router.put("/updateToDo", updateToDo);
router.put("/editToDo", editToDo);

module.exports = router;
