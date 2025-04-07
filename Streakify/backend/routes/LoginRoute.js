// routes/LoginRoute.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/LoginController');
const { checkAuthHeader } = require('../middleware/authMiddleware');

router.get('/', checkAuthHeader, login);

module.exports = router;