const express = require('express');
const { authMiddlewareToken } = require("../middleware/authMiddlewareToken");
const { getFriends } = require('../services/FriendService')

const friendRoute = express.Router();

friendRoute.get("/", authMiddlewareToken, async (req, res) => {
    const user = req.user.id;
    try {
        const friends = await getFriends(user);
        res.status(200).json(friends);
    } catch (err) {
        res.status(404).json({ error: err.message + "Friends not found" });
    }
})

module.exports = friendRoute;