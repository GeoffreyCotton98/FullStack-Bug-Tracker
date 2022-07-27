//bring in express on files
//common js syntax
const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getUserTickets,
  getSingleTicket,
  createTickets,
  updateTickets,
  deleteTickets,
} = require("../controllers/ticketController");

const { protect, protectAdmin } = require("../middleware/authMiddleware");

//@ admin routes

//@desc get all tickets
//@access private
router.route("/ticketsAdmin").get(protectAdmin, getAllTickets);

//@ user routes

//@desc get user tickets
//@access private
router.route("/userTickets").get(protect, getUserTickets);

//common routes
//access private
router.route("/").post(protect, createTickets);
router.route("/:id").get(protect, getSingleTicket);

//PUT and DELETE request must include id
router.route("/:id").put(updateTickets).delete(deleteTickets);

module.exports = router;
