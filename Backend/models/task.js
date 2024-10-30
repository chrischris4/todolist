const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['En attente', 'En cours', 'Fini'],
  },
  priority: {
    type: String,
    required: true,
    enum: ['Basse', 'Moyenne', 'Haute'],
  },
  endTime: { type: Date, required: true },
  creationTime: { type: Date, required: true },
  updateTime: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userConcerned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Task', taskSchema);
