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

router.route("/users").get(getUsers);
router.post("/", loginUser);
router.post("/Register", registerUser);
router.get("/me", protect, getMe);

module.exports = router;
