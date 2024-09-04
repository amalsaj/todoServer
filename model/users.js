const mongoose = require("mongoose");

// User Schema Definition
const userSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Pre-save Middleware to Generate Unique ID
userSchema.pre("save", async function (next) {
  const user = this;

  // Only generate a unique ID if this is a new document
  if (user.isNew) {
    const prefix = "TDLUSR";

    // Find the user with the highest uniqueId
    const lastUser = await User.findOne().sort({ uniqueId: -1 });

    let newId;

    if (lastUser && lastUser.uniqueId) {
      const lastNumber = parseInt(lastUser.uniqueId.replace(prefix, ""), 10);
      const newNumber = lastNumber + 1;
      newId = `${prefix}${newNumber.toString().padStart(3, "0")}`;
    } else {
      newId = `${prefix}001`;
    }

    user.uniqueId = newId;
  }

  next();
});

// Model Definition
const User = mongoose.model("Users", userSchema);

module.exports = User;
