const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
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
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
