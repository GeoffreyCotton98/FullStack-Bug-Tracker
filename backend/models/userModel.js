const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/backend-restructure
    firstName: {
      type: String,
      required: [true, "please enter a name"],
    },
    lastName: {
<<<<<<< HEAD
=======
    name: {
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
>>>>>>> refs/remotes/origin/backend-restructure
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
<<<<<<< HEAD
<<<<<<< HEAD
    role: {
      type: String,
      enum: ["Admin", "Project-Manager", "Developer"],
      default: "Developer",
=======
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDev: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDev: {
      type: Boolean,
      required: true,
      default: false,
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
    role: {
      type: String,
      enum: ["admin", "dev", "client"],
      default: "admin",
>>>>>>> refs/remotes/origin/backend-restructure
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
