const express = require("express");
const { authMiddlewareToken } = require("../middleware/authMiddlewareToken");
const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendRequests,
  deleteFriend,
} = require("../services/FriendRequestService");

const friendRequestRoute = express.Router();

friendRequestRoute.post("/send", authMiddlewareToken, async (req, res) => {
  try {
    const { receiverName } = req.body;
    if (!receiverName) {
      return res.status(400).json({ error: "Receiver Name is required." });
    }
    if (receiverName == req.user.userName) {
      console.log("Hä")
      return res.status(400).json({ error: "You can't send friend request to yourself" });
    }
    const request = await sendFriendRequest(req.user.userName, receiverName);
    res.status(201).json({
      message: "Freundschaftsanfrage erfolgreich gesendet.",
      request,
    });
  } catch (error) {
    console.error("Fehler beim Senden der Freundschaftsanfrage:", error);
    res.status(500).json({ error: error.message });
  }
});

friendRequestRoute.post("/accept", authMiddlewareToken, async (req, res) => {
  try {
    const { senderName } = req.body;

    if (!senderName) {
      return res.status(400).json({ error: "Sender Name is required." });
    }

    const request = await acceptFriendRequest(senderName, req.user.userName);

    res.status(200).json({
      message: "Freundschaftsanfrage erfolgreich akzeptiert.",
      request,
    });
  } catch (error) {
    console.error("Fehler beim Akzeptieren der Freundschaftsanfrage:", error);
    res.status(500).json({ error: error.message });
  }
});

friendRequestRoute.post("/decline", authMiddlewareToken, async (req, res) => {
  try {
    const { senderName } = req.body;

    if (!senderName) {
      return res.status(400).json({ error: "Sender Name is required." });
    }

    const request = await declineFriendRequest(senderName, req.user.userName);

    res.status(200).json({
      message: "Freundschaftsanfrage erfolgreich abgelehnt.",
      request,
    });
  } catch (error) {
    console.error("Fehler beim Ablehnen der Freundschaftsanfrage:", error);
    res.status(500).json({ error: error.message });
  }
});

friendRequestRoute.get("/pending", authMiddlewareToken, async (req, res) => {
  try {
    const requests = await getFriendRequests(req.user.userName);

    res.status(200).json({
      message: "Ausstehende Freundschaftsanfragen erfolgreich abgerufen.",
      requests,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Freundschaftsanfragen:", error);
    res.status(500).json({ error: error.message });
  }
});

friendRequestRoute.delete("/:friendName", authMiddlewareToken, async (req, res) => {
  try {
    const { friendName } = req.params;

    if (!friendName) {
      return res.status(400).json({ error: "Friend Name is required." });
    }

    const success = await deleteFriend(req.user.userName, friendName);

    if (success) {
      res.status(200).json({ message: "Freund erfolgreich gelöscht." });
    } else {
      res.status(404).json({ error: "Freund nicht gefunden." });
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Freundes:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = friendRequestRoute;
