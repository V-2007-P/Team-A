
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { register, login } from './auth.controller.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 2. Use the Gemini Key from the .env Vault
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// This tells the server to look for index.html, voice1.html, etc. in your main folder
app.use(express.static(__dirname));

// --- NEW: AI GMAIL SUMMARIZATION ROUTE ---
app.post('/api/summarize-email', async (req, res) => {
    try {
        const { emailContent } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" }); // Use stable model name

        const prompt = `You are a formal assistant for the visually impaired. 
        Summarize the following email content in exactly one clear, professional sentence 
        focusing on the sender's purpose: "${emailContent}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();
        
        res.json({ summary });
    } catch (error) {
        console.error("❌ AI Summarization Error:", error);
        res.status(500).json({ error: "Failed to generate AI summary" });
    }
});

// --- ROUTE 2: AI SMART SUGGESTIONS ---
app.post('/api/suggest-replies', async (req, res) => {
    try {
        const { context } = req.body; 
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `Based on this message context: "${context}", provide exactly 3 formal, short reply suggestions (max 5 words each). 
        Format your response as a simple numbered list like: 
        1. [Option 1] 
        2. [Option 2] 
        3. [Option 3] 
        Do not add any other text.`;
       
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const suggestions = response.text();
        
        res.json({ suggestions });
    } catch (error) {
        console.error("❌ AI Suggestion Error:", error);
        res.status(500).json({ error: "Failed to fetch AI suggestions" });
    }
});

app.get('/api/telegram-fetch', async (req, res) => {
    try {
        const offset = req.query.offset || 0;
        const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
        
        // This acts as the bridge to fetch new messages from Telegram
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${offset}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Telegram Fetch Error:", error);
        res.status(500).json({ error: "Failed to fetch from Telegram" });
    }
});


//send
app.post('/api/telegram-send', async (req, res) => {
    try {
        // 1. Get the data from your voice1.html
        const { chatId, text } = req.body; 
        const token = process.env.TELEGRAM_TOKEN;

        // 2. This is where the magic happens: 
        // We take YOUR 'chatId' and turn it into TELEGRAM'S 'chat_id'
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: chatId, // <--- MUST have the underscore here
                text: text 
            })
        });

        const data = await response.json();
        
        if (data.ok) {
            console.log("✅ SUCCESS: Telegram received the message!");
            res.json({ success: true });
        } else {
            // This tells you EXACTLY why Telegram said no
            console.error("❌ TELEGRAM REJECTED:", data.description);
            res.status(500).json({ error: data.description });
        }
    } catch (error) {
        console.error("❌ PROXY CRASHED:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Routes
app.post('/register', register);
app.post('/login', login);

// Entry point
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server active on port ${PORT}`);
});