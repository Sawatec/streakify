const mongoose = require("mongoose");


const missionSchema = new mongoose.Schema({
  nummer: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  action: { type: String, required: true },
  amount: { type: Number, required: true },
  reward: { type: Number, required: true }
}, { timestamps: true });

const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
