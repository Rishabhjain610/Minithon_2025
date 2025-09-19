const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsapp = async (req, res) => {
  const recipientNumber = '+918433943227';
  const messageBody = 'Your booking is confirmed. Thank you for choosing us!';
  try {
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${recipientNumber}`,
      body: messageBody,
    });
    res.status(200).json({ success: true, message: "Booking confirmation sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to send WhatsApp message.", details: error.message });
  }
};

module.exports = { sendWhatsapp };