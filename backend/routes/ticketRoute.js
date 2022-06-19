//bring in express on files
//common js syntax
const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTickets,
  updateTickets,
  deleteTickets,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

//GET and POST
//.route can be chained with .get and .post
router.route("/").get(getTickets).post(createTickets);
router.route("/:id").get(getTicket);

//PUT and DELETE request must include id
router.route("/:id").put(updateTickets).delete(deleteTickets);

module.exports = router;
