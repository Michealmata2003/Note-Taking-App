const User = require("../models/User");
const { sendTokenResponse } = require("../utils/token");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide name, email and password" 
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ 
      success: false, 
      message: "Email already registered" 
    });
  }

  const user = await User.create({ name, email, password });
  sendTokenResponse(user, 201, res);
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide email and password" 
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid credentials" 
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid credentials" 
    });
  }

  sendTokenResponse(user, 200, res);
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// @desc    Update profile (name, avatar)
// @route   PUT /api/auth/me
// @access  Private
const updateMe = async (req, res) => {
  const { name, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, user });
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    return res.status(400).json({ 
      success: false, 
      message: "Current password is incorrect" 
    });
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
};

module.exports = { register, login, getMe, updateMe, changePassword };