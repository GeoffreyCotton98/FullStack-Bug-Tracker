const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getProjectUsers,
  addProjectUser,
} = require("../controllers/projectController");

const { protect, protectAdmin } = require("../middleware/authMiddleware");

//Admin routes
router.route("/").post(protect, createProject);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);

//@desc get all projects
//@access private
router.route("/projectsAdmin").get(protectAdmin, getAllProjects);

//@desc get single project
router.route("/:id").get(protect, getSingleProject);

//@desc get single project
router.route("addProjectUser/:id").post(protect, addProjectUser);

module.exports = router;
