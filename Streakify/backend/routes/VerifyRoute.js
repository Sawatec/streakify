const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const config = require('config');

const verifyRoute = express.Router();

verifyRoute.get('/:token', async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.get('session.tokenKey'));
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = verifyRoute;