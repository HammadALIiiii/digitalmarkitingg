import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const MESSAGES_FILE = '/tmp/messages.json'; // Use /tmp for ephemeral storage in serverless

// --- EMAIL CONFIGURATION (Using Environment Variables) ---
const EMAIL_CONFIG = {
    user: process.env.GMAIL_USER || 'hammaddd1230@gmail.com',
    pass: process.env.GMAIL_PASS || 'lxtv orux wlcq zjym',
    target: process.env.TARGET_EMAIL || 'hammaddd1230@gmail.com'
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.pass
    }
});
// ----------------------------

app.use(cors());
app.use(express.json());

// Ensure messages file exists
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeJsonSync(MESSAGES_FILE, []);
}

// POST: Save a new message and forward to email
app.post('/api/messages', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const messages = await fs.readJson(MESSAGES_FILE);

        const newMessage = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };

        messages.push(newMessage);
        await fs.writeJson(MESSAGES_FILE, messages);

        // Try to forward to email
        if (EMAIL_CONFIG.pass !== 'your-app-password-here') {
            const mailOptions = {
                from: EMAIL_CONFIG.user,
                to: EMAIL_CONFIG.target,
                subject: `New Portfolio Message: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email forwarding error:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        } else {
            console.log('Email skip: Please set a valid Gmail App Password in server.js');
        }

        res.status(201).json({ success: true, message: 'Message saved successfully!' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// GET: Retrieve all messages (for admin)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await fs.readJson(MESSAGES_FILE);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Basic root for health check
app.get('/api', (req, res) => {
    res.json({ status: 'API is running in serverless mode' });
});

export default app;
