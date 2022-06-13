//@desc     Register a new User
//@route    /api/users/Register
//@access   public
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  //validation

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }

  res.send("Register Route");
};

//@desc     Login a new User
//@route    /api/users
//@access   public
const loginUser = (req, res) => {
  res.send("Login Route");
};

module.exports = {
  registerUser,
  loginUser,
};
