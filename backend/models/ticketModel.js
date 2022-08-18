const mongoose = require("mongoose");
const { stringify } = require("querystring");

const assignedTickets = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ticketSchema = mongoose.Schema(
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
    assigned: [assignedTickets],
    comments: [],
    changes: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
