const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

//Create Goals
//POST /api/tasks
//acces private
const createTickets = asyncHandler(async (req, res) => {
  const { user, title, description, dueDate, status, priority, type } =
    req.body;
  if (
    (!user, !title || !description || !dueDate || !status || !priority || !type)
  ) {
    res.status(400);
    throw new Error("please add all required fields");
  }

  const ticket = await Ticket.create({
    user,
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
  const tickets = await Ticket.find(req.body);
  res.status(200).json(tickets);
});

const getUserTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.status(200).json(ticket);
});

//Update Goals
//PUT /api/tasks/:id
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
//Create Goals
//POST /api/tickets/:id
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
  createTickets,
  updateTickets,
  deleteTickets,
};
