// api.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Define a schema for messages
const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

// Create a model for messages
const Message = mongoose.model('Message', messageSchema);

const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Connect to MongoDB (Make sure to replace the URL with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/chatbot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// API endpoint to get all messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// API endpoint to send a new message
router.post('/messages', async (req, res) => {
    const { user, message } = req.body;

    if (!user || !message) {
        return res.status(400).json({ error: 'User and message are required' });
    }

    const newMessage = new Message({ user, message });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Export the router
module.exports = router;
