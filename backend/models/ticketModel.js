const mongoose = require("mongoose");
const { stringify } = require("querystring");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "please add title"],
    },
    dueDate: {
      type: String,
      required: [true, "please add due date"],
    },
    priority: {
      type: String,
      required: [true, "please add priority"],
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
