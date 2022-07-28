const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

//@desc     Register a new User
//@route    /api/users/Register
//@access   public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //validation

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }

  //find if user already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@desc     Login a new User
//@route    /api/users
//@access   public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check user and passwords match//
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

//@desc     Get Current User
//@route    /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lasttName,
  };
  res.status(200).json(user);
});

//@desc Get all users for admins
//@route /api/users/users
//access Private
const getUsersAll = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (user.role !== "admin") {
    res.status(400);
    throw new Error("not authorized");
  }
  const users = await User.find(req.body);
  res.status(200).json(users);
});

//@desc Get single user for admins
//@route /api/users/users
//access Private
const getUser = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id);
  const user = await User.findById(req.params.id);
  if (!loggedInUser) {
    res.status(400);
    throw new Error("not authorized");
  }
  if (loggedInUser.role !== "admin") {
    res.status(400);
    throw new Error("not authorized");
  }
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  res.status(200).json(user);
});

//@desc allow admins to delete users
//@route /api/users/:id
//access Private

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (loggedInUser.role !== "admin") {
    res.status(401);
    throw new Error("not authorized");
  }

  await user.remove();
});

//Update Users
//PUT /api/users/:id
//acces private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  if (loggedInUser.role !== "admin") {
    res.status(401);
    throw new Error("not authorized");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json(updatedUser);
});
//generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsersAll,
  getUser,
  deleteUser,
  updateUser,
};
