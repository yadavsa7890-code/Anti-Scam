const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ==================================================
   MIDDLEWARE
================================================== */

// Allow requests from the React frontend
app.use(cors());

// Allow JSON request bodies
app.use(express.json());

/* ==================================================
   TEST ROUTE
================================================== */

app.get("/", (req, res) => {
    res.json({
        message: "AntiScam backend is running!"
    });
});

/* ==================================================
   CHAT API
================================================== */

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    /* --------------------------------------------------
       VALIDATION
    -------------------------------------------------- */

    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
            error: "Message is required."
        });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length > 3000) {
        return res.status(400).json({
            error: "Message is too long. Please send a shorter message."
        });
    }

    /* --------------------------------------------------
       API KEY CHECK
    -------------------------------------------------- */

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error("Server Error: Missing OPENROUTER_API_KEY environment variable.");
        return res.status(503).json({
            error: "AI service is not configured."
        });
    }

    /* --------------------------------------------------
       OPENROUTER REQUEST (WITH TIMEOUT)
    -------------------------------------------------- */

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://anti-scam-beta.vercel.app",
                    "X-Title": "AntiScam College Project"
                },
                body: JSON.stringify({
                    model: "openrouter/free",
                    max_tokens: 300,
                    temperature: 0.4,
                    messages: [
                        {
                            role: "system",
                            content: `You are AntiScam, a concise cybersecurity safety assistant.

Your purpose is to help users recognize and respond safely to phishing, scams, and online fraud.

Core Safety Rules:
- Never ask for, repeat, or store passwords, OTPs, PINs, CVVs, card numbers, or bank credentials.
- Never claim to be a bank, law enforcement, or government authority.
- Never claim AntiScam can retrieve lost money or officially file police reports.
- If money was lost or sensitive info was compromised, tell the victim to immediately contact their bank or payment app to freeze accounts/cards.
- For financial cyber fraud in India, direct users to call the National Cyber Crime Helpline: 1930 and file a report at https://cybercrime.gov.in/
- Advise preserving evidence (screenshots, transaction IDs/UTR numbers, sender phone numbers, URLs).

Response Style (Keep It Short & Fast):
- Put the most critical, immediate safety action first.
- Avoid lengthy greetings, philosophical introductions, and unnecessary background explanations.
- When practical, structure guidance simply:
  What to do:
  1. [Action 1]
  2. [Action 2]
  3. [Action 3]

  Important:
  [Key warning]
- Keep responses concise (normally under 150 words).
- If key details are missing, ask only one brief follow-up question.`
                        },
                        {
                            role: "user",
                            content: trimmedMessage
                        }
                    ]
                })
            }
        );

        /* --------------------------------------------------
           RESPONSE HANDLING
        -------------------------------------------------- */

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
            console.error(`OpenRouter returned HTTP ${response.status}:`, data?.error?.message || "Unknown error");
            return res.status(response.status).json({
                error: data?.error?.message || "Unable to get AI response. Please try again."
            });
        }

        const reply = data?.choices?.[0]?.message?.content;

        if (!reply || !reply.trim()) {
            return res.status(500).json({
                error: "The AI returned an empty response. Please try again."
            });
        }

        res.json({
            reply: reply.trim()
        });

    } catch (error) {
        clearTimeout(timeoutId);

        /* --------------------------------------------------
           ERROR HANDLING
        -------------------------------------------------- */

        if (error.name === "AbortError") {
            console.error("OpenRouter request timed out after 25 seconds.");
            return res.status(504).json({
                error: "The AI assistant took too long to respond. Please try again in a moment."
            });
        }

        console.error("Chat API error:", error.message || error);

        res.status(500).json({
            error: "Unable to connect to the AI service. Please try again later."
        });
    }
});

/* ==================================================
   SERVER START
================================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AntiScam backend running on port ${PORT}`);
});