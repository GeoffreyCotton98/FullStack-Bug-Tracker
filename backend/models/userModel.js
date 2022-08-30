const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter a name"],
    },
    lastName: {
      type: String,
      required: [true, "please enter a name"],
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
    },
    role: {
      type: String,
      enum: ["Admin", "Project-Manager", "Developer"],
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
