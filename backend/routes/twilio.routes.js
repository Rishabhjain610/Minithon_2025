const express = require('express');
const router = express.Router();
const { sendWhatsapp } = require('../controller/twilio.controller');

router.post('/send', sendWhatsapp);

module.exports = router;