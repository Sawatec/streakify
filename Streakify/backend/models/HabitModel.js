const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  time: { type: String, required: true },
  fulfilled: { type: Boolean, default: false },
  category: { type: String, required: true },
  frequency: { type: [String], default: [] },
  level: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  friends: { type: [String], default: [] },
  runtime: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  completionHistory: [
    {
      completedAt: { type: Date, required: true },
      xpEarned: { type: Number, default: 0 }
    }
  ],
  streak: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Habit || mongoose.model('Habit', habitSchema);
