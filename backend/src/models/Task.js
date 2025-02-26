const mongoose = require('mongoose');

  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
      createdAt: { type: Date, default: Date.now },
      description: {type: String, required: true}
  });

  exports.task = mongoose.model('Task', taskSchema);