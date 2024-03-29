//bring in express on files
//common js syntax
const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getCreatedTickets,
  getUserAssignedTickets,
  getUserTickets,
  getSingleTicket,
  getAssignedTickets,
  createTickets,
  updateTickets,
  deleteTickets,
  getTicketAuthor,
  getProjectTickets,
  addTicketComment,
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

//PUT and DELETE request must include id
router.route("/:id").put(protect, updateTickets).delete(protect, deleteTickets);

//@ user routes

//@desc get user tickets
//@access private
router.route("/userTickets").get(protect, getUserTickets);

router.route("/ticketAuthor/:id").get(protect, getTicketAuthor);

//get assigned to tickets
router.route("/assignedTickets").get(protect, getAssignedTickets);

//@desc add Comments to Ticket
router.route("/addComment/:id").put(protect, addTicketComment);

//common routes
router.route("/").post(protect, createTickets);
router.route("/:id").get(protect, getSingleTicket);

module.exports = router;
