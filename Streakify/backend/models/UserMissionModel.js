const mongoose = require("mongoose");

const missionUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nummer: { type: Number, required: true },
  type: { type: String, required: true },
  action: { type: String, required: true },
  amount: { type: Number, required: true },
  reward: { type: Number, required: true },
  currentStatus: { type: Number, default: 0 },
  finished: { type: Boolean, default: false }
}, { timestamps: true });

const MissionUser = mongoose.model("MissionUser", missionUserSchema);

module.exports = MissionUser;
