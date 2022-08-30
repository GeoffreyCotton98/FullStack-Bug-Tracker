const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getMyProjects,
  getProjectManagerProjects,
  addProjectUser,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

//Admin routes

router.route("/").post(protect, createProject);

//@desc add users to project
router.route("/addProjectUser/:id").put(protect, addProjectUser);

//@desc get all projects
//@access private
router.route("/projectsAdmin").get(protect, getAllProjects);

//@desc get all my projects
//@access private
router.route("/MyProjects").get(protect, getMyProjects);

//@desc get all projects for Project managers and admins
//@access private
router.route("/ProjectManagerProjects").get(protect, getProjectManagerProjects);

//@desc get single project
router.route("/:id").get(protect, getSingleProject);

///Common Routes

router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;
