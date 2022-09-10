const express = require("express");
<<<<<<< HEAD
const asyncHandler = require("express-async-handler");
=======
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
<<<<<<< HEAD
  getUsersAll,
  getUser,
  updateUser,
  deleteUser,
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
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", loginUser);
router.post("/Register", registerUser);
router.get("/me", protect, getMe);
>>>>>>> c79b032093d81f814494ac7e8ff00c82f6159127

module.exports = router;
