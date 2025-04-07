const express = require("express");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const registerRouter = express.Router();
const verifyCodeRouter = express.Router();
const resendVerificationCodeRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  try {
    const {
      email,
      password,
      isAdmin,
      userName,
      name,
      dateOfBirth,
      profilePicture,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email und Passwort sind erforderlich" });
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verificationCodeExpires = Date.now() + 10 * 60 * 1000; // Code expires in 10 minutes

    const newUser = new User({
      email,
      password,
      isAdmin,
      userName: userName || null,
      name: name || null,
      dateOfBirth: dateOfBirth || null,
      profilePicture: profilePicture || null,
      isVerified: false, // User is not verified yet
      verificationCode,
      verificationCodeExpires,
    });

    await newUser.save();

    // Send verification email
    await sendEmail(
      newUser.email,
      "Your Verification Code",
      `Your verification code is: ${verificationCode}`
    );

    const token = jwt.sign(
      { id: newUser._id.toString(), email: newUser.email },
      config.get("session.tokenKey"),
      { expiresIn: "10m" } // Set token expiration to 10 minutes
    );

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      token,
      verificationCodeExpires,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

verifyCodeRouter.post("/", async (req, res) => {
  const { token, verificationCode } = req.body;

  if (!token || !verificationCode) {
    return res.status(400).json({ message: "Token und Verifizierungscode sind erforderlich" });
  }

  try {
    const decoded = jwt.verify(token, config.get("session.tokenKey"));
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User nicht gefunden" });
    }

    if (user.verificationCode !== verificationCode || user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({ message: "Ungültiger oder abgelaufener Verifizierungscode" });
    }

    user.isVerified = true;
    user.verificationCode = null; // Entfernen Sie den Verifizierungscode nach  Verifizierung
    await user.save();

    res.json({ success: true, message: "E-Mail erfolgreich verifiziert!" });
  } catch (error) {
    res.status(400).json({ message: "Ungültiger oder abgelaufener Token" });
  }
});

resendVerificationCodeRouter.post("/", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token fehlt" });
  }

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, config.get("session.tokenKey"));
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        decoded = jwt.decode(token);
      } else {
        throw error;
      }
    }

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User nicht gefunden" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // Code expires in 10 minutes
    await user.save();

    await sendEmail(
      user.email,
      "Your Verification Code",
      `Your verification code is: ${verificationCode}`
    );

    const newToken = jwt.sign({ id: user._id.toString(), email: user.email }, config.get("session.tokenKey"), { expiresIn: '10m' }); // Set token expiration to 10 minutes

    res.json({ success: true, message: "Verifizierungscode erneut gesendet", verificationCodeExpires: user.verificationCodeExpires, token: newToken });
  } catch (error) {
    console.error("Error during resending verification code:", error);
    res.status(400).json({ message: "Ungültiger oder abgelaufener Token" });
  }
});

module.exports = { registerRouter, verifyCodeRouter, resendVerificationCodeRouter };