const Message = require("../models/MessageModel");
const { getUserByUserName } = require("./UserService");

// Gibt alle Nachrichten zurück, die zwischen chatUserName und userId ausgetauscht wurden
async function getMessages(chatUserName, userId) {
    try {
        const chatUser = await getUserByUserName(chatUserName);
        if (!chatUser) {
            throw new Error(`User with username ${chatUserName} not found.`);
        }

        const chatUserId = chatUser.id;
        const messages = await Message.find({
            $or: [
                { senderId: userId, recipientId: chatUserId },
                { senderId: chatUserId, recipientId: userId },
            ],
        }).sort({ timestamp: 1 }); // Sortierung nach älteste zuerst

        return messages;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}

async function postMessage(senderId, recipientUserName, message) {
    try {
        if (!message || message.trim() === "") {
            throw new Error("Message content cannot be empty.");
        }

        const recipientUser = await getUserByUserName(recipientUserName);
        if (!recipientUser) {
            throw new Error(`Recipient with username ${recipientUserName} not found.`);
        }

        const recipientId = recipientUser.id;

        const newMessage = new Message({
            senderId,
            recipientId,
            message: message,
            timestamp: new Date(),
        });

        const savedMessage = await newMessage.save();

        return savedMessage;
    } catch (error) {
        console.error("Error posting message:", error);
        throw error;
    }
}


// prüft ob der user ungelesene Nachrichten hat, gibt dann ein true oder false zurück
async function checkNotification(userId) {
    try {
        const message = await Message.findOne({ recipientId: userId, read: false }); //sucht nach einer Nachricht, die an den User geht und noch ungelesen ist.
        return message ? true : false;
    } catch (error) {
        console.error('Error checking notifications:', error);
        return false;
    }
}

// setzt alle gelesenen Nachrichten auf read = true
async function setMessagesOnRead(readMessages) {
    try {
        await Message.updateMany(
            { _id: { $in: readMessages } }, // Bedingung: ID muss im Array sein
            { $set: { read: true } } // Setzt read auf true
        );

        console.log(`${readMessages.length} Nachrichten wurden auf read gesetzt.`);
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Nachrichten:', error);
        throw error;
    }
}

module.exports = { getMessages, postMessage, checkNotification, setMessagesOnRead };