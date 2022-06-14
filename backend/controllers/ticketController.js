const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

//Create Goals
//POST /api/tasks
//acces private
const createTickets = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("please add all required fields");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    title: req.body.title,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    comments: req.body.comment,
  });
  res.status(200).json(ticket);
});
//Get/Read Goals
//GET /api/tasks
//acces private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});
//Update Goals
//PUT /api/tasks/:id
//acces private
const updateTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("task not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //make sure only logged in user matches task user
  if (ticket.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

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
//POST /api/tasks/:id
//acces private
const deleteTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("task not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //make sure only logged in user matches task user
  if (ticket.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await task.remove();
});

module.exports = {
  getTickets,
  createTickets,
  updateTickets,
  deleteTickets,
};
