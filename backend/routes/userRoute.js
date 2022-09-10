const express = require("express");
<<<<<<< HEAD
<<<<<<< HEAD
const asyncHandler = require("express-async-handler");
=======
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======
const asyncHandler = require("express-async-handler");
>>>>>>> refs/remotes/origin/backend-restructure
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> refs/remotes/origin/backend-restructure
  getUsersAll,
  getUser,
  updateUser,
  deleteUser,
<<<<<<< HEAD
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.post("/", loginUser);
router.post("/Register", registerUser);

//common routes
router.route("/me").get(protect, getMe);

//Admin routes
router.route("/usersAll").get(protect, getUsersAll);

router
  .route("/:id")
  .put(protect, updateUser)
  .delete(protect, deleteUser)
  .get(protect, getUser);
=======
=======
>>>>>>> refs/remotes/origin/backend-restructure
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.post("/", loginUser);
router.post("/Register", registerUser);
<<<<<<< HEAD
router.get("/me", protect, getMe);
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
=======

//common routes
router.route("/me").get(protect, getMe);

//Admin routes
router.route("/usersAll").get(protect, getUsersAll);

router
  .route("/:id")
  .put(protect, updateUser)
  .delete(protect, deleteUser)
  .get(protect, getUser);
>>>>>>> refs/remotes/origin/backend-restructure

module.exports = router;
