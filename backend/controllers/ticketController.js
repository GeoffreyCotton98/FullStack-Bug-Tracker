const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

//Create Tickets
//POST /api/tickets
//acces private
const createTickets = asyncHandler(async (req, res) => {
  const { title, description, dueDate, status, priority, type } = req.body;
  if (!title || !description || !dueDate || !status || !priority || !type) {
    res.status(400);
    throw new Error("please add all required fields");
  }

  //get user with id

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    title,
    description,
    dueDate,
    status,
    priority,
    type,
  });
  res.status(201).json(ticket);
});
//Get/ all tickets
//GET /api/tickets/ticketsAdmin
//acces private
const getAllTickets = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (user.role !== "admin") {
    res.status(400);
    throw new Error("not authorized");
  }
  const tickets = await Ticket.find(req.body);
  res.status(200).json(tickets);
});

//Get user tickets
//GET /api/ticekts/userTickets
//access private

const getUserTickets = asyncHandler(async (req, res) => {
  //get users tickets with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

//Get single ticket
//GET /api/tickets/:id
//access private

const getSingleTicket = asyncHandler(async (req, res) => {
  //get ticket with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  res.status(200).json(ticket);
});

//Update Tickets
//PUT /api/tickets/:id
//acces private
const updateTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("ticket not found");
  }

  // const user = await User.findById(req.user.id);

  // //check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("user not found");
  // }

  // //make sure only logged in user matches ticket user
  // if (ticket.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("user not authorized");
  // }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTicket);
});
//Delete Ticekts
//DELETE /api/tickets/:id
//acces private
const deleteTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("ticket not found");
  }

  // const user = await User.findById(req.user.id);

  // //check for user
  // if (!user) {
  //   res.status(401);
  //   throw new Error("user not found");
  // }

  // //make sure only logged in user matches ticket user
  // if (ticket.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error("user not authorized");
  // }

  await ticket.remove();
});

module.exports = {
  getAllTickets,
  getUserTickets,
  getSingleTicket,
  createTickets,
  updateTickets,
  deleteTickets,
};
