const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsersAll,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, protectAdmin } = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.post("/", loginUser);
router.post("/Register", registerUser);

//Admin routes
router.route("/usersAll").get(protectAdmin, protect, getUsersAll);

router
  .route("/:id")
  .put(protectAdmin, updateUser)
  .delete(protectAdmin, deleteUser);

//common routes
router.get("/me", protect, getMe);

module.exports = router;
