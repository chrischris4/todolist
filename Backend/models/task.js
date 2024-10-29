const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);
