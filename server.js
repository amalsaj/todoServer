const express = require("express");
const cors = require("cors");
require('dotenv').config()
const userRoutes = require("./route/authRoute");
const toDoRoutes = require("./route/toDoRoute");
const connectDB = require("./db/db");

const app = express();
app.use(express.json());
app.use(cors());

//db connect
connectDB();

// Use user routes
app.use("/api/users", userRoutes);
app.use("/api/todo", toDoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
