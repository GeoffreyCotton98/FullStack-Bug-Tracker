const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.post("/", loginUser);
router.post("/Register", registerUser);

//Admin routes

router.get("/users", protect, getUsers);

router.get("/me", protect, getMe);

module.exports = router;
