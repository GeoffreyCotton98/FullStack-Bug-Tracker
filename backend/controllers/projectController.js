const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

//Create Project
//POST /api/projects
//acces private
const createProject = asyncHandler(async (req, res) => {
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
    currentGoal,
    description,
    dueDate,
    status,
    team,
    projectManager,
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
    throw new Error("project not found");
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
module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getMyProjects,
  getUserProjects,
  getProjectManagerProjects,
  getProjectDevelopers,
  getProjectManager,
  addProjectUser,
};
