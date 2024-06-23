const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ success: false, message: "Please login" });
    }
    const securePassword = await bcrypt.hash(password, 10);
    user = await User.create({ username, email, password: securePassword });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "This account is not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      success: true,
      message: "Login successfull",
    });
  } catch (error) {
    return res.status(500).json({ success: flase, message: error.message });
  }
};

const checkAuth = async (req, res) => {
  const id = req.id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "Access Denied" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User fetched", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, checkAuth };
