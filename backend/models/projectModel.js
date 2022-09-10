const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
<<<<<<< HEAD
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
=======
>>>>>>> refs/remotes/origin/backend-restructure
    title: {
      type: String,
      required: [true, "please add title"],
    },
    description: {
      type: String,
      required: [true, "please add description"],
    },
    dueDate: {
      type: String,
      required: [true, "please add due date"],
    },
    status: {
      type: String,
      default: "Development",
    },
<<<<<<< HEAD
    currentGoal: {
      type: String,
      default: "No Goal Set",
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
=======
    team: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
>>>>>>> refs/remotes/origin/backend-restructure
      },
    ],

    comments: [],
    changes: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
