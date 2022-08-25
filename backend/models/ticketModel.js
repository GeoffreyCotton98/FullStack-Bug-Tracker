const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please add project"],
      ref: "Project",
    },
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
      required: [true, "please add status"],
      default: "Open",
    },
    priority: {
      type: String,
      required: [true, "please add priority"],
    },
    type: {
      type: String,
      required: [true, "please add due date"],
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [],
    changes: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
