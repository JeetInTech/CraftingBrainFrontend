const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot Setup
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Your chat ID or group ID

if (!BOT_TOKEN || !CHAT_ID) {
  console.error('Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your .env file');
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Function to format the contact message
const formatContactMessage = (formData) => {
  const { name, email, phone, subject, message, inquiryType } = formData;
  
  return `
🚀 *NEW CONTACT FORM SUBMISSION*

📋 *Inquiry Type:* ${inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)}
👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone || 'Not provided'}
📝 *Subject:* ${subject}

💬 *Message:*
${message}

⏰ *Submitted at:* ${new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  })}
  `.trim();
};

// API endpoint to receive contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const { name, email, subject, message, inquiryType } = formData;
    
    if (!name || !email || !subject || !message || !inquiryType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Format the message
    const telegramMessage = formatContactMessage(formData);
    
    // Send to Telegram
    await bot.sendMessage(CHAT_ID, telegramMessage, {
      parse_mode: 'Markdown'
    });
    
    console.log('Contact form submitted and sent to Telegram:', {
      name,
      email,
      inquiryType,
      timestamp: new Date().toISOString()
    });
    
    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to process contact form'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Contact Form Bot'
  });
});

// Test Telegram connection endpoint
app.get('/api/test-telegram', async (req, res) => {
  try {
    const testMessage = `🧪 *Bot Test Message*\n\nBot is working correctly!\nTime: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
    
    await bot.sendMessage(CHAT_ID, testMessage, {
      parse_mode: 'Markdown'
    });
    
    res.json({
      success: true,
      message: 'Test message sent to Telegram'
    });
  } catch (error) {
    console.error('Telegram test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test message'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Telegram bot connected`);
  console.log(`💬 Messages will be sent to chat ID: ${CHAT_ID}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

module.exports = app;