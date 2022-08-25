const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

//Create Project
//POST /api/projects
//acces private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, dueDate, status, team } = req.body;
  if (!title || !description || !dueDate) {
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
    description,
    dueDate,
    status,
    team,
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

//Get project users
//GET /api/projects/users
//access private

const getProjectUsers = asyncHandler(async (req, res) => {
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

  res.status(200).json(project.team);
});

//Add user to project user
//PUT /api/projects/users
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

  const projectUsers = project.team.push(req.body);

  res.status(200).json(projectUsers, project);
});
module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getProjectUsers,
  addProjectUser,
};
