const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const JWT_TOKEN = process.env.JWT_TOKEN;

// Funtion - registers a user
module.exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // checks if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    // validate the request

    // creates a new user
    const newUser = new User({
      email,
      password,
      profile: { firstName, lastName },
    });
    await newUser.save();

    // generate a token
    const token = jwt.sign({ _id: newUser._id }, JWT_TOKEN, {
      expiresIn: "1d",
    });

    res.status(201).json({ success: true, message: "Account created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error);
  }
};

// Function - logs in a user
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checks if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // checks if the password is a match
    if (!(await user.isPasswordMatch(password))) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password" });
    }

    // generate a token
    const token = jwt.sign({ _id: user._id }, JWT_TOKEN, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, message: "User logged in", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
