const axios = require('axios');
const prisma = require('../config/db');

/**
 * Sends a WhatsApp message using UltraMsg API or similar service.
 * @param {string} to - The recipient's phone number
 * @param {string} body - The message content
 */
const sendWhatsAppMessage = async (to, body) => {
    try {
        // Fetch instance ID and token from settings
        const instanceSetting = await prisma.setting.findUnique({ where: { key: 'whatsapp_instance_id' } });
        const tokenSetting = await prisma.setting.findUnique({ where: { key: 'whatsapp_token' } });

        if (!instanceSetting || !tokenSetting || !instanceSetting.value || !tokenSetting.value) {
            console.log('WhatsApp is not configured. Skipping message to:', to);
            return false;
        }

        const instanceId = instanceSetting.value;
        const token = tokenSetting.value;

        // UltraMsg URL format
        const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

        const data = {
            token: token,
            to: to,
            body: body
        };

        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(`WhatsApp message sent to ${to}:`, response.data);
        return true;
    } catch (error) {
        console.error(`Failed to send WhatsApp message to ${to}:`, error.message);
        return false;
    }
};

module.exports = {
    sendWhatsAppMessage
};
