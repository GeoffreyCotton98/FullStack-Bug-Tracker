//bring in express on files
//common js syntax
const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTickets,
  updateTickets,
  deleteTickets,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

//GET and POST
//.route can be chained with .get and .post
router.route("/").get(getTickets).post(protect, createTickets);

//PUT and DELETE request must include id
router.route("/:id").put(protect, updateTickets).delete(protect, deleteTickets);

module.exports = router;
