const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsapp = async (req, res) => {
  const recipientNumber = '+918433943227'; // Replace with dynamic value if needed
  const roomName = "Shiv Sagar Dormitory"; // Replace with dynamic value if needed
  const checkIn = "2025-10-20"; // Replace with dynamic value if needed
  const checkOut = "2025-10-25"; // Replace with dynamic value if needed
  const customerName = "Rishabh"; // Replace with dynamic value if needed

  const messageBody = `✅ Hi ${customerName}, your room booking at ${roomName} is confirmed!\n\n🗓️ Check-in: ${checkIn}\n🗓️ Check-out: ${checkOut}\n\nThank you for choosing us. We look forward to hosting you! 🏨`;

  try {
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${recipientNumber}`,
      body: messageBody,
    });
    res.status(200).json({ success: true, message: "Room booking confirmation sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to send WhatsApp message.", details: error.message });
  }
};

module.exports = { sendWhatsapp };