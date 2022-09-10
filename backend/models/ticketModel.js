const mongoose = require("mongoose");
<<<<<<< HEAD
=======
const { stringify } = require("querystring");
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
<<<<<<< HEAD
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please add project"],
      ref: "Project",
    },
=======
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
    title: {
      type: String,
      required: [true, "please add title"],
    },
<<<<<<< HEAD
    description: {
      type: String,
      required: [true, "please add description"],
    },
=======
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
    dueDate: {
      type: String,
      required: [true, "please add due date"],
    },
<<<<<<< HEAD
    status: {
      type: String,
      required: [true, "please add status"],
      default: "Open",
=======
    type: {
      type: String,
      required: [true, "please add due date"],
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
    },
    priority: {
      type: String,
      required: [true, "please add priority"],
    },
<<<<<<< HEAD
    type: {
      type: String,
      required: [true, "please add due date"],
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
    changes: [],
=======
    comments: {
      type: String,
    },
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = mongoose.model("Ticket", ticketSchema);
=======
module.exports = mongoose.model("Task", ticketSchema);
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
