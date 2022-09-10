//bring in express on files
//common js syntax
const express = require("express");
const router = express.Router();
const {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/backend-restructure
  getAllTickets,
  getCreatedTickets,
  getUserAssignedTickets,
  getUserTickets,
  getSingleTicket,
  getAssignedTickets,
<<<<<<< HEAD
  createTickets,
  updateTickets,
  deleteTickets,
  getTicketAuthor,
  getProjectTickets,
} = require("../controllers/ticketController");

const { protect, protectAdmin } = require("../middleware/authMiddleware");

//@ admin routes

//@desc get all tickets
//@access private
router.route("/ticketsAdmin").get(protect, getAllTickets);

//@desc get all tickets created by any user
//@access private
router.route("/user/:id").get(protect, getCreatedTickets);

//@desc get all tickets assigned to any user
//@access private
router.route("/assigned/:id").get(protect, getUserAssignedTickets);

//@desc get all tickets assigned to any user
//@access private
router.route("/projectTickets/:id").get(protect, getProjectTickets);
=======
  getTickets,
=======
>>>>>>> refs/remotes/origin/backend-restructure
  createTickets,
  updateTickets,
  deleteTickets,
} = require("../controllers/ticketController");

const { protect, protectAdmin } = require("../middleware/authMiddleware");

<<<<<<< HEAD
//GET and POST
//.route can be chained with .get and .post
router.route("/").get(getTickets).post(protect, createTickets);
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
//@ admin routes

//@desc get all tickets
//@access private
router.route("/ticketsAdmin").get(protect, getAllTickets);

//@desc get all tickets created by any user
//@access private
router.route("/user/:id").get(protect, getCreatedTickets);

//@desc get all tickets assigned to any user
//@access private
router.route("/assigned/:id").get(protect, getUserAssignedTickets);

//@ user routes

//@desc get user tickets
//@access private
router.route("/userTickets").get(protect, getUserTickets);

//get assigned to tickets
router.route("/assignedTickets").get(protect, getAssignedTickets);

//common routes
//access private
router.route("/").post(protect, createTickets);
router.route("/:id").get(protect, getSingleTicket);
>>>>>>> refs/remotes/origin/backend-restructure

//PUT and DELETE request must include id
router.route("/:id").put(updateTickets).delete(deleteTickets);

<<<<<<< HEAD
//@ user routes

//@desc get user tickets
//@access private
router.route("/userTickets").get(protect, getUserTickets);

router.route("/ticketAuthor/:id").get(protect, getTicketAuthor);

//get assigned to tickets
router.route("/assignedTickets").get(protect, getAssignedTickets);

//common routes
//access private
router.route("/").post(protect, createTickets);
router.route("/:id").get(protect, getSingleTicket);

=======
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
module.exports = router;
