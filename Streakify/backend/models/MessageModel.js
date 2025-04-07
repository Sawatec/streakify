const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definition des Message-Schemas
const messageSchema = new Schema({
    senderId: { type: String, required: true },
    recipientId: { type: String, required: false },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;