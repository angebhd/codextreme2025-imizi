const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
});


module.exports = mongoose.model('Family', familySchema);