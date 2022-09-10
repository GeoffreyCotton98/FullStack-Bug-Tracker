const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

//Create Project
//POST /api/projects
//acces private
const createProject = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  const {
    title,
    description,
    dueDate,
    status,
    projectManager,
    team,
    currentGoal,
  } = req.body;
  if (!title || !description || !dueDate || !projectManager) {
=======
  const { title, description, dueDate, status, team } = req.body;
  if (!title || !description || !dueDate) {
>>>>>>> refs/remotes/origin/backend-restructure
    res.status(400);
    throw new Error("please add all required fields");
  }

  //get user with id

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const project = await Project.create({
    createdBy: req.user.id,
    title,
<<<<<<< HEAD
    currentGoal,
=======
>>>>>>> refs/remotes/origin/backend-restructure
    description,
    dueDate,
    status,
    team,
<<<<<<< HEAD
    projectManager,
=======
>>>>>>> refs/remotes/origin/backend-restructure
  });
  res.status(201).json(project);
});

//Get/ all projects
//GET /api/projects/projectsAdmin
//acces private
const getAllProjects = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  const projects = await Project.find(req.body);
  res.status(200).json(projects);
});

//Get single ticket
//GET /api/tickets/:id
//access private

const getSingleProject = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.status(200).json(project);
});

//Update Project
//PUT /api/projects/:id
//acces private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
<<<<<<< HEAD
    throw new Error("Project not found");
=======
    throw new Error("project not found");
>>>>>>> refs/remotes/origin/backend-restructure
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(200).json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("project not found");
  }

  await project.remove();
});

<<<<<<< HEAD
//Get my projects
//GET /api/MyProjects/users
//access private

const getMyProjects = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const projects = await Project.find({ team: { $in: [req.user.id] } });

  if (!projects) {
    res.status(404);
    throw new Error("Projects not found");
  }

  res.status(200).json(projects);
});

//Get user projects
//GET /api/projects/UserProjects
//access private

const getUserProjects = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const projects = await Project.find({ team: { $in: [req.params.id] } });

  if (!projects) {
    res.status(404);
    throw new Error("Projects not found");
  }

  res.status(200).json(projects);
});

//Get projects for project managers
//GET /api/projects/ProjectManagerProjects
//access private

const getProjectManagerProjects = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const projects = await Project.find({ projectManager: req.user.id });

  if (!projects) {
    res.status(404);
    throw new Error("Projects not found");
  }

  res.status(200).json(projects);
});

//Get developers for project
//GET /api/projects/projectDevelopers/:id
//access private

const getProjectDevelopers = asyncHandler(async (req, res) => {
=======
//Get project users
//GET /api/projects/users
//access private

const getProjectUsers = asyncHandler(async (req, res) => {
>>>>>>> refs/remotes/origin/backend-restructure
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

<<<<<<< HEAD
  const projectDevelopers = await User.find({ _id: { $in: project.team } });

  res.status(200).json(projectDevelopers);
});

//Get developers for project from ticket
//GET /api/projects/projectDevelopersFromTicket/:id
//access private

const getProjectDevelopersFromTicket = asyncHandler(async (req, res) => {
  //get user with id
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

  const project = await Project.findById(ticket.project);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const projectDevelopers = await User.find({ _id: { $in: project.team } });

  res.status(200).json(projectDevelopers);
});

//Get developers for project
//GET /api/projects/projectDevelopers/:id
//access private

const getProjectManager = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const projectManagerAssigned = await User.findById(project.projectManager);

  res.status(200).json(projectManagerAssigned);
});

//Add user to project
//Get /api/projects/addProjectUser/:id
=======
  res.status(200).json(project.team);
});

//Add user to project user
//PUT /api/projects/users
>>>>>>> refs/remotes/origin/backend-restructure
//access private

const addProjectUser = asyncHandler(async (req, res) => {
  //get user with id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

<<<<<<< HEAD
  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $addToSet: {
        team: req.body,
      },
    }
  );

  res.status(200).json(updatedProject);
});

=======
  const projectUsers = project.team.push(req.body);

  res.status(200).json(projectUsers, project);
});
>>>>>>> refs/remotes/origin/backend-restructure
module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
<<<<<<< HEAD
  getMyProjects,
  getUserProjects,
  getProjectManagerProjects,
  getProjectDevelopers,
  getProjectDevelopersFromTicket,
  getProjectManager,
=======
  getProjectUsers,
>>>>>>> refs/remotes/origin/backend-restructure
  addProjectUser,
};
