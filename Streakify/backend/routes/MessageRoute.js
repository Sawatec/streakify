const express = require('express');
const { getMessages, postMessage, checkNotification, setMessagesOnRead } = require('../services/MessageService'); // Importiere postMessage
const { authMiddlewareToken } = require('../middleware/authMiddlewareToken');

const messageRoute = express.Router();

// GET-Route zum Abrufen ob es ungelesene Nachrichten gibt (true, false)
messageRoute.get('/notifications', authMiddlewareToken, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            throw new Error('User not found');
        }
        const userId = req.user.id;
        const notifications = await checkNotification(userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Notifications' + error.message });
    }
});

// GET-Route zum Abrufen von Nachrichten
messageRoute.get('/:chatUserName', authMiddlewareToken, async (req, res) => {
    try {
        const chatUserName = req.params.chatUserName;
        if (!req.user || !req.user.id) {
            throw new Error('User not found');
        }
        const userId = req.user.id; // JavaScript kennt req.user als Objekt
        const messages = await getMessages(chatUserName, userId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Nachrichten' + error.message });
    }
});

// POST-Route zum Senden einer Nachricht
messageRoute.post('/', authMiddlewareToken, async (req, res) => {
    try {
        const { senderId, recipientUserName, message } = req.body;
        if (!senderId || !recipientUserName || !message) {
            throw new Error('Missing required fields');
        }
        const newMessage = await postMessage(senderId, recipientUserName, message);
        res.status(201).json(newMessage);

    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Senden der Nachricht' });
    }
});

// POST-Route zum Nachrichten auf gelesen setzen
messageRoute.post('/read', authMiddlewareToken, async (req, res) => {
    try {
        const readMessages = req.body;
        if (!readMessages) {
            throw new Error('Missing required fields');
        }
        await setMessagesOnRead(readMessages);
        res.status(201).json();

    } catch (error) {
        res.status(500).json({ error: 'Fehler Nachrichten auf gelesen setzen' });
    }
});


module.exports = messageRoute;