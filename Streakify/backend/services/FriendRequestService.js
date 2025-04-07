const FriendRequest = require('../models/FriendRequestModel');
const User = require('../models/UserModel');
const { checkProgress } = require("../services/UserMissionService");

// Senden einer Freundschaftsanfrage
async function sendFriendRequest(senderName, receiverName) {
    try {
        const sender = await User.findOne({ userName: senderName });
        const receiver = await User.findOne({ userName: receiverName });

        if (!sender || !receiver) {
            throw new Error("Sender oder Empfänger wurde nicht gefunden.");
        }
        if (sender == receiver) {
            throw new Error('Sender und Empfänger sind identisch.');
        }

        const existingRequest = await FriendRequest.findOne({ sender: sender._id, receiver: receiver._id });
        if (existingRequest) {
            throw new Error("Freundschaftsanfrage existiert bereits.");
        }

        const newRequest = await FriendRequest.create({
            sender: sender._id,
            receiver: receiver._id,
        });

        await User.findByIdAndUpdate(sender._id, { $push: { sentFriendRequests: newRequest } }, { new: true });
        await User.findByIdAndUpdate(receiver._id, { $push: { receivedFriendRequests: newRequest } }, { new: true });

        console.log("Freundschaftsanfrage gesendet:", newRequest);

        // Fortschritt für Freundschaftsmissionen prüfen
        const missionResult = await checkProgress(sender._id, "friends", 1, "create");

        return { newRequest, missionResult };
    } catch (error) {
        console.error("Fehler beim Senden der Freundschaftsanfrage:", error);
        throw error;
    }
}

// Akzeptieren einer Freundschaftsanfrage
async function acceptFriendRequest(senderName, receiverName) {
    try {
        const sender = await User.findOne({ userName: senderName });
        const receiver = await User.findOne({ userName: receiverName });

        if (!sender || !receiver) {
            throw new Error('Sender oder Empfänger wurde nicht gefunden.');
        }

        const request = await FriendRequest.findOne({ sender: sender._id, receiver: receiver._id, status: 'pending' });
        if (!request) {
            throw new Error('Freundschaftsanfrage nicht gefunden.');
        }

        // Freundschaftsanfrage als akzeptiert markieren und löschen
        await FriendRequest.findByIdAndDelete(request._id);

        // Freunde zu den jeweiligen Benutzerlisten hinzufügen
        await User.findByIdAndUpdate(sender._id, { $addToSet: { friends: receiver._id } }, { new: true });
        await User.findByIdAndUpdate(receiver._id, { $addToSet: { friends: sender._id } }, { new: true });

        // Freundschaftsanfragen aus den Benutzerobjekten entfernen
        await User.findByIdAndUpdate(sender._id, { $pull: { sentFriendRequests: request._id } }, { new: true });
        await User.findByIdAndUpdate(receiver._id, { $pull: { receivedFriendRequests: request._id } }, { new: true });

console.log('Freundschaftsanfrage akzeptiert und gelöscht:', request);

const missionResult = await checkProgress(receiver._id, "friends", 1, "update");

return {
  message: 'Freundschaftsanfrage akzeptiert und erfolgreich gelöscht.',
  sender,
  receiver,
  missionResult,
};
    } catch (error) {
        console.error('Fehler beim Akzeptieren der Freundschaftsanfrage:', error);
        throw error;
    }
}


// Ablehnen einer Freundschaftsanfrage
async function declineFriendRequest(senderName, receiverName) {
    try {
        const sender = await User.findOne({ userName: senderName });
        const receiver = await User.findOne({ userName: receiverName });

        if (!sender || !receiver) {
            throw new Error('Sender oder Empfänger wurde nicht gefunden.');
        }

        const request = await FriendRequest.findOne({ sender: sender._id, receiver: receiver._id, status: 'pending' });
        if (!request) {
            throw new Error('Freundschaftsanfrage nicht gefunden.');
        }

        await request.deleteOne();

        console.log('Freundschaftsanfrage abgelehnt:', request);

        // Fortschritt für Freundschaftsmissionen prüfen
        const missionResult = await checkProgress(receiver._id, "friends", 1, "delete");

        return { request, missionResult };
    } catch (error) {
        console.error('Fehler beim Ablehnen der Freundschaftsanfrage:', error);
        throw error;
    }
}

// Abrufen der Freundschaftsanfragen
async function getFriendRequests(userName) {
    try {
        const user = await User.findOne({ userName });

        if (!user) {
            throw new Error('User nicht gefunden.');
        }

        const requests = await FriendRequest.find({ receiver: user._id, status: 'pending' }).populate('sender', 'userName');
        return requests;
    } catch (error) {
        console.error('Fehler beim Abrufen der Freundschaftsanfragen:', error);
        throw error;
    }
}

// Löschen eines Freundes
async function deleteFriend(userName, friendName) {
    try {
        const user = await User.findOne({ userName: userName });
        const friend = await User.findOne({ userName: friendName });

        if (!user || !friend) {
            throw new Error('User oder Freund wurde nicht gefunden.');
        }

        if (!user.friends.includes(friend._id)) {
            return false;
        }

        // Nutzer und Freund gegenseitig entfernen Bugfix
        user.friends = user.friends.filter((id) => !id.equals(friend._id));
        friend.friends = friend.friends.filter((id) => !id.equals(user._id));

        await Promise.all([user.save(), friend.save()]);

        console.log('Freund erfolgreich gelöscht.');

        // Fortschritt für Freundschaftsmissionen prüfen
        const missionResult = await checkProgress(user._id, "friends", 1, "delete");

        return { success: true, missionResult };

    } catch (error) {
        console.error('Fehler beim Löschen der Freundschaft:', error);
        throw new Error('Fehler beim Löschen der Freundschaft.');
    }
}


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getFriendRequests,
    deleteFriend,
};
