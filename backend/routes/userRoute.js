const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsersAll,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.post("/", loginUser);
router.post("/Register", registerUser);

//Admin routes
router.route("/usersAll").get(protect, getUsersAll);

router
  .route("/:id")
  .put(protect, updateUser)
  .delete(protect, deleteUser)
  .get(protect, getUser);

//common routes
router.get("/me", protect, getMe);

module.exports = router;
