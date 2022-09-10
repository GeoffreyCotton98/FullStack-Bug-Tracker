const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

<<<<<<< HEAD
//Create Tickets
//POST /api/tickets
//acces private
const createTickets = asyncHandler(async (req, res) => {
  const { title, description, project, dueDate, status, priority, type } =
    req.body;
  if (!title || !description || !dueDate || !status || !priority || !type) {
=======
//Create Goals
//POST /api/tasks
//acces private
const createTickets = asyncHandler(async (req, res) => {
  if (!req.body.title) {
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
    res.status(400);
    throw new Error("please add all required fields");
  }

<<<<<<< HEAD
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
    project,
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

  const tickets = await Ticket.find(req.body);
  res.status(200).json(tickets);
});

//////User Tickets/////////

//Get tickets a user created
//for admins only
//GET /api/tickets/user/:id
//access private

const getCreatedTickets = asyncHandler(async (req, res) => {
  //get users tickets with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ user: req.params.id });

  res.status(200).json(tickets);
});

//Get tickets a user created
//for admins only
//GET /api/tickets/user/:id
//access private

const getUserAssignedTickets = asyncHandler(async (req, res) => {
  //get users tickets with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ assigned: req.params.id });

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

//Get user tickets asssigned to
//GET /api/ticekts/assignedTickets
//access private

const getAssignedTickets = asyncHandler(async (req, res) => {
  //get users tickets with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ assigned: req.user.id });
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
=======
  const ticket = await Ticket.create({
    user: req.user.id,
    title: req.body.title,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    comments: req.body.comments,
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
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
//acces private
const updateTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
<<<<<<< HEAD
    throw new Error("ticket not found");
=======
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
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
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
<<<<<<< HEAD

//Delete Tickets
//DELETE /api/tickets/:id
=======
//Create Goals
//POST /api/tasks/:id
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
//acces private
const deleteTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
<<<<<<< HEAD
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

//Get Ticket Author
//GET /api/tickets/ticketAuthor/:id
//acces private

const getTicketAuthor = asyncHandler(async (req, res) => {
  //get ticket with id
  const user = await User.findById(req.user.id);
=======
    throw new Error("task not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

<<<<<<< HEAD
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  const ticketAuthor = await User.findById(ticket.user);

  if (!ticketAuthor) {
    res.status(401);
    throw new Error("user not found");
  }

  res.status(200).json(ticketAuthor);
});

//////Project Tickets////////////////

////get all tickets attached to a project
//GET /api/tickets/projectTickets/:id
//acces private

const getProjectTickets = asyncHandler(async (req, res) => {
  //get project tickets with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const tickets = await Ticket.find({ project: req.params.id });
  res.status(200).json(tickets);
});

module.exports = {
  getAllTickets,
  getCreatedTickets,
  getUserAssignedTickets,
  getUserTickets,
  getAssignedTickets,
  getSingleTicket,
  createTickets,
  updateTickets,
  deleteTickets,
  getTicketAuthor,
  getProjectTickets,
=======
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
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
};
