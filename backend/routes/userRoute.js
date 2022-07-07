const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsersAll,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.post("/", loginUser);
router.post("/Register", registerUser);

//Admin routes

router.get("/usersAll", getUsersAll);

router.get("/me", protect, getMe);

module.exports = router;
