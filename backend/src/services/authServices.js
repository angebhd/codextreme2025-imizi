const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token
exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email },JWT_SECRET, { expiresIn: '90d' }
  );
};

// Verify JWT Token (optional: used in middleware)
exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};