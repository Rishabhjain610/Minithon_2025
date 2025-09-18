const express = require('express');
const ChatRouter = express.Router();
const { bot } = require('../controller/Chatbot.contoller');

// The path is now '/' which maps to the base path defined in index.js
ChatRouter.post('/', bot);

module.exports = ChatRouter;