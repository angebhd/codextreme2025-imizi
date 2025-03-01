const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authService = require('../services/authServices');

// Register a new user
exports.signup = async (req, res) => {
  const { firstName, lastName,role, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ firstName, lastName, role, email, password });
    await newUser.save();

    // Generate JWT token
    const token = authService.generateToken(newUser);

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = authService.generateToken(user);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.googleLogin = async (req, res) => {
    
  
  try {
    const token = authService.generateToken(req.user);    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getData = async (req, res) => {
  const user = await User.findById(req.user).populate({
    path: 'family',  // Populate the 'family' field in the User schema
    populate: [
      {
        path: 'members',  // Populate the 'members' field in the Family schema
        model: 'User',     // Specify that 'members' are referenced from the 'User' model
        select: 'firstName lastName email'  // Select specific fields to include for the members
      },
      {
        path: 'adminId',  // Populate the 'adminId' field in the Family schema
        model: 'User',    // Specify that 'adminId' is referenced from the 'User' model
        select: 'firstName lastName email'  // Select specific fields to include for the admin
      }
    ]
  })
    .populate({
      path: 'invite',  // Populate the 'family' field in the User schema
    populate: [
      {
        path: 'members',  // Populate the 'members' field in the Family schema
        model: 'User',     // Specify that 'members' are referenced from the 'User' model
        select: 'firstName lastName email'  // Select specific fields to include for the members
      },
      {
        path: 'adminId',  // Populate the 'adminId' field in the Family schema
        model: 'User',    // Specify that 'adminId' is referenced from the 'User' model
        select: 'firstName lastName email'  // Select specific fields to include for the admin
      }
    ]
    }).populate("tasks");
  // console.log(user.sundayQuizScores);

  try {

    res.status(200).json({ message: 'Sucess', firstName: user.firstName, lastName: user.lastName, email: user.email, family: user.family, invite:user.invite, sundayQuizScores: user.sundayQuizScores, dailyQuizScores:user.dailyQuizScores});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


