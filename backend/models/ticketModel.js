const mongoose = require("mongoose");
<<<<<<< HEAD
<<<<<<< HEAD
=======
const { stringify } = require("querystring");
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
>>>>>>> refs/remotes/origin/backend-restructure

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
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/backend-restructure
    description: {
      type: String,
      required: [true, "please add description"],
    },
<<<<<<< HEAD
=======
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
>>>>>>> refs/remotes/origin/backend-restructure
    dueDate: {
      type: String,
      required: [true, "please add due date"],
    },
<<<<<<< HEAD
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
=======
    status: {
      type: String,
      required: [true, "please add status"],
      default: "Open",
>>>>>>> refs/remotes/origin/backend-restructure
    },
    priority: {
      type: String,
      required: [true, "please add priority"],
    },
<<<<<<< HEAD
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
=======
    type: {
>>>>>>> refs/remotes/origin/backend-restructure
      type: String,
      required: [true, "please add due date"],
    },
<<<<<<< HEAD
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [],
    changes: [],
>>>>>>> refs/remotes/origin/backend-restructure
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
<<<<<<< HEAD
module.exports = mongoose.model("Ticket", ticketSchema);
=======
module.exports = mongoose.model("Task", ticketSchema);
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
module.exports = mongoose.model("Ticket", ticketSchema);
>>>>>>> refs/remotes/origin/backend-restructure
