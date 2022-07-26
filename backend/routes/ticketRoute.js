//bring in express on files
//common js syntax
const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getUserTickets,
  createTickets,
  updateTickets,
  deleteTickets,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

//GET and POST
//.route can be chained with .get and .post

//@ admin routes
//@desc get all tickets
//@access private
router.get("/ticketsAdmin", getAllTickets);

router.route("/:id").get(getUserTickets);
router.post("/", createTickets);

//PUT and DELETE request must include id
router.route("/:id").put(updateTickets).delete(deleteTickets);

module.exports = router;
