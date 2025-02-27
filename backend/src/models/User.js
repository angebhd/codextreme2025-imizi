const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, },
  email: { type: String, required: true, unique: true },
  family: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
  tasks: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  }],
  password: { type: String },
  invite: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' }, //invite link
  googleId: { type: String },
  role: { type: String, required: true, enum: ['member', 'child', 'parent'], default: "member" }

});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);