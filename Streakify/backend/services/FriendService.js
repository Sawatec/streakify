const User = require("../models/UserModel");

async function getFriends(userId) {
    try {
        const user = await User.findOne({ _id: userId }).populate({
            path: 'friends',
            select: 'userName name profilePicture level'
        });
        if (!user) {
            console.warn(`User with ID ${userId} not found.`);
            return [];
        }
        return user.friends;
    } catch (err) {
        console.error(`Error fetching friends for user ${userId}:`, err.message);
        return [];
    }
}

module.exports = { getFriends };
