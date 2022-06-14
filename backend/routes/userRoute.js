const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", loginUser);
router.post("/Register", registerUser);
router.get("/me", protect, getMe);

module.exports = router;
