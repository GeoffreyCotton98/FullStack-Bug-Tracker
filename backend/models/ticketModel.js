const mongoose = require("mongoose");
const { stringify } = require("querystring");

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
    comments: [],
    changes: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
