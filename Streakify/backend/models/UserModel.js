const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const hashPassword = require("../middleware/hashPassword");
const { getUserItemByName } = require("../services/UserService");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: false },
    isAdmin: { type: Boolean, default: false, required: true },
    userName: { type: String, unique: true, trim: true, required: true },
    name: { type: String, trim: true },
    dateOfBirth: { type: Date },
    lastLogin: { type: Date, default: null },
    streak: { type: Number, default: 0 },
    profilePicture: { type: String, default: null },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    points: { type: Number, default: 80 },
<<<<<<< HEAD
=======
    lastStreakDate: {
      type: Date,
    },
>>>>>>> 50eb0ec744c14c687e43f6cee6e3df4d1b8e3b66
    sentFriendRequests: [{ type: mongoose.Schema.Types.Mixed }],
    receivedFriendRequests: [{ type: mongoose.Schema.Types.Mixed }],
    missions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mission" }],
    companion: { type: String, required: true, default: "https://res.cloudinary.com/dsalrs1mc/image/upload/v1738276684/llncem85jkdpmwg90llr.png" },


    // Google Authentication Fields
    googleId: { type: String, unique: true, sparse: true }, // Store Google ID

    // Email Verification Fields
    isVerified: { type: Boolean, default: false }, // Tracks email verification status
    verificationCode: { type: String }, // Stores the verification code
    verificationCodeExpires: { type: Date }, // Expiration time of verification code
    inventory: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "ShopItem" },
        imageUrl: { type: String },
        name: { type: String },
      },
    ],
  }, { timestamps: true });


// Vor dem Speichern: Passwort hashen
userSchema.pre("save", hashPassword);

// Methode zur Validierung des Passworts
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
