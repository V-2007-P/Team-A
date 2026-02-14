
// import express from 'express';
// import cors from 'cors';
// import { register, login } from './auth.controller.js';
// import { db } from './db.js'; // Ensure the DB connection is initialized

// const app = express();

// // Middleware
// app.use(cors());
// // Increased limit is essential for the LONGTEXT face_data strings
// app.use(express.json({ limit: '50mb' })); 
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// // Routes
// app.post('/register', register);
// app.post('/login', login);

// // Health check to verify server is alive
// app.get('/', (req, res) => res.send("Bio-Secure Server is Running 🚀"));

// const PORT = 3000;

// // Start Server with Error Handling
// const server = app.listen(PORT, () => {
//     console.log(`🚀 Server active at: http://localhost:${PORT}`);
// }).on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//         console.error(`❌ Error: Port ${PORT} is already in use.`);
//         console.log("👉 Fix: Run 'lsof -i :3000' and then 'kill -9 [PID]'");
//     } else {
//         console.error("❌ Server startup error:", err);
//     }
// });

// import express from 'express';
// import cors from 'cors';
// import { register, login } from './auth.controller.js';
// import { db } from './db.js'; // Ensure the DB connection is initialized
// import { GoogleGenerativeAI } from "@google/generative-ai"; // Added Gemini Library

// const app = express();

// const genAI = new GoogleGenerativeAI('AIzaSyBKb7f4d4D4N7ahExC1Qi_iDL7H23sjJpY');

// // Middleware
// app.use(cors());
// // Increased limit is essential for the LONGTEXT face_data strings
// app.use(express.json({ limit: '50mb' })); 
// app.use(express.urlencoded({ limit: '50mb', extended: true }));


// // --- NEW: GMAIL SUMMARIZATION ROUTE ---
// app.post('/api/summarize-email', async (req, res) => {
//     try {
//         const { emailContent } = req.body;
        
//         // Using the 1.5-flash model for high speed and low latency
//         const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

//         const prompt = `You are a formal assistant for the visually impaired. 
//         Summarize the following email content in exactly one clear, professional sentence 
//         focusing on the sender's purpose: "${emailContent}"`;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const summary = response.text();
        
//         res.json({ summary });
//     } catch (error) {
//         console.error("❌ AI Summarization Error:", error);
//         res.status(500).json({ error: "Failed to generate AI summary" });
//     }
// });


// // --- ROUTE 2: AI SMART SUGGESTIONS ---
// app.post('/api/suggest-replies', async (req, res) => {
//     try {
//         const { context} = req.body; // Context is  a Telegram msg 
//         const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

//         const prompt = `Based on this message context: "${context}", provide exactly 3 formal, short reply suggestions (max 5 words each). 
//         Format your response as a simple numbered list like: 
//         1. [Option 1] 
//         2. [Option 2] 
//         3. [Option 3] 
//         Do not add any other text.`;
       
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const suggestions = response.text();
        
//         res.json({ suggestions });
//     } catch (error) {
//         console.error("❌ AI Suggestion Error:", error);
//         res.status(500).json({ error: "Failed to fetch AI suggestions" });
//     }
// });


// // Routes
// app.post('/register', register);
// app.post('/login', login);

// // Health check to verify server is alive
// app.get('/', (req, res) => res.send("Bio-Secure Server is Running 🚀"));

// const PORT = 3000;

// // Start Server with Error Handling
// const server = app.listen(PORT, () => {
//     console.log(`🚀 Server active at: http://localhost:${PORT}`);
// }).on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//         console.error(`❌ Error: Port ${PORT} is already in use.`);
//         console.log("👉 Fix: Run 'lsof -i :3000' and then 'kill -9 [PID]'");
//     } else {
//         console.error("❌ Server startup error:", err);
//     }
// });


import 'dotenv/config'; // 1. CRITICAL: This loads your .env variables at the very start
import express from 'express';
import cors from 'cors';
import { register, login } from './auth.controller.js';
import path from 'path'; // 👈 NEW: Required for file paths
import { fileURLToPath } from 'url'; // 👈 NEW: Required for ESM __dirname
//import { db } from './db.js'; 
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

//This ensures that visiting your main link (/) loads index.html automatically
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
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

// --- NEW: TELEGRAM PROXY ROUTE (SECURITY FIX) ---
// This allows voice1.html to send messages without needing the Telegram Token
// --- TELEGRAM FETCH PROXY ---
// app.post('/api/telegram-send', async (req, res) => {
//     try {
//         const { chatId, text } = req.body; // Incoming from your HTML
//         const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

//         const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             // THE FIX: Telegram needs chat_id (with underscore)
//             body: JSON.stringify({ chat_id: chatId, text: text }) 
//         });

//         const data = await response.json();
//         if (data.ok) {
//             res.json({ success: true });
//         } else {
//             // This will show you WHY Telegram rejected it in your terminal
//             console.error("❌ Telegram API Error:", data.description);
//             res.status(500).json({ error: data.description });
//         }
//     } catch (error) {
//         console.error("❌ Proxy Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
//
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

// --- TELEGRAM FETCH PROXY ---
// app.get('/api/telegram-fetch', async (req, res) => {
//     try {
//         const offset = req.query.offset || 0;
//         const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
        
//         const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${offset}`);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error("❌ Telegram Fetch Error:", error);
//         res.status(500).json({ error: "Failed to fetch from Telegram" });
//     }
// });

// Routes
app.post('/register', register);
app.post('/login', login);


// --- 1. THE STATIC ROUTE (Replaces your old Health Check) ---

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 2. SERVER STARTUP (Improved for Cloud) ---
const PORT = process.env.PORT || 3000;

// Adding '0.0.0.0' tells the cloud server to accept connections from the public internet
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 VAANI Server is Live!`);
    console.log(`📡 Listening on Port: ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Error: Port ${PORT} is already in use.`);
    } else {
        console.error("❌ Server startup error:", err);
    }
});
// Health check
// app.get('/', (req, res) => res.send("Bio-Secure Server is Running 🚀"));

// // 3. Use the Port from .env or default to 3000
// const PORT = process.env.PORT || 3000;

// const server = app.listen(PORT, () => {
//      //console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`🚀 Server active at: http://localhost:${PORT}`);
// }).on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//         console.error(`❌ Error: Port ${PORT} is already in use.`);
//     } else {
//         console.error("❌ Server startup error:", err);
//     }
// });