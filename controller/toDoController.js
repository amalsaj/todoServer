const User = require("../model/users");
const ToDos = require("../model/todos");

// Create ToDos Controller
const createToDos = async (req, res, next) => {
  try {
    const { email, description, category, date, time, important, isCompleted } =
      req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("User not found");
    }

    // Create a new ToDo entry
    const todos = new ToDos({
      userId: user.uniqueId,
      description,
      category,
      date,
      time,
      important,
      isCompleted,
    });

    // Save the ToDo entry to the database
    await todos.save();

    // Send the created ToDo as a response
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(`Failed to create ToDos, ${error.message}`);
  }
};

// Get ToDos Controller
const getTodos = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("User not found");
    }

    const todos = await ToDos.find({ userId: user.uniqueId }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json(`Failed to get ToDos, ${error.message}`);
  }
};

// Delete ToDo Controller
const deleteToDo = async (req, res, next) => {
  try {
    const { email, todoId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("User not found");
    }

    const deleted = await ToDos.findOneAndDelete({
      _id: todoId,
      userId: user.uniqueId,
    });

    if (deleted) {
      return res.status(200).json("ToDo item deleted successfully");
    } else {
      return res.status(404).json("ToDo item not found");
    }
  } catch (error) {
    res.status(500).json(`Failed to delete ToDo, ${error.message}`);
  }
};

// Update ToDo Status Controller
const updateToDo = async (req, res, next) => {
  try {
    const { email, todoId, isCompleted } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("User not found");
    }

    const updated = await ToDos.findOneAndUpdate(
      { _id: todoId, userId: user.uniqueId },
      { isCompleted },
      { new: true }
    );

    if (updated) {
      return res.status(200).json("ToDo status updated successfully");
    } else {
      return res.status(404).json("ToDo item not found");
    }
  } catch (error) {
    res.status(500).json(`Failed to update ToDo status, ${error.message}`);
  }
};

// Edit ToDo Controller
const editToDo = async (req, res, next) => {
  try {
    const { email, todoId, description, time, date } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json("User not found");
    }

    const updated = await ToDos.findOneAndUpdate(
      { _id: todoId, userId: user.uniqueId },
      { description, time, date },
      { new: true }
    );

    if (updated) {
      return res.status(200).json("ToDo edited successfully");
    } else {
      return res.status(404).json("ToDo item not found");
    }
  } catch (error) {
    res.status(500).json(`Failed to edit ToDo, ${error.message}`);
  }
};

module.exports = { createToDos, getTodos, deleteToDo, updateToDo, editToDo };
