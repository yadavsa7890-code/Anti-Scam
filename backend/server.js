const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

// Allow requests from frontend
app.use(cors());

// Allow JSON request bodies
app.use(express.json());


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {
    res.json({
        message: "AntiScam backend is running!"
    });
});


// ========================================
// ANTISCAM CHAT API
// ========================================

app.post("/api/chat", async (req, res) => {

    const { message } = req.body;


    // Validate user message
    if (
        !message ||
        typeof message !== "string" ||
        !message.trim()
    ) {
        return res.status(400).json({
            error: "Message is required."
        });
    }


    // Prevent extremely large messages
    if (message.length > 3000) {
        return res.status(400).json({
            error: "Message is too long. Please send a shorter message."
        });
    }


    // Check API key
    if (!process.env.OPENROUTER_API_KEY) {
        console.error("OPENROUTER_API_KEY is missing.");

        return res.status(500).json({
            error: "AI service is not configured."
        });
    }


    try {

        // ========================================
        // SEND REQUEST TO OPENROUTER
        // ========================================

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json",

                    "HTTP-Referer":
                        "https://anti-scam-beta.vercel.app",

                    "X-Title":
                        "AntiScam College Project"
                },

                body: JSON.stringify({

                    // Free OpenRouter model router
                    model: "openrouter/free",

                    // Keep responses reasonably short
                    max_tokens: 300,

                    // Slightly reduce randomness
                    temperature: 0.4,

                    messages: [

                        // ========================================
                        // SYSTEM INSTRUCTIONS
                        // ========================================

                        {
                            role: "system",

                            content: `
You are AntiScam, a cybersecurity awareness assistant.

Your job is to help users recognize and respond to phishing, scams, and online fraud.

GENERAL RULES:

- Give simple, practical, and accurate scam-safety guidance.
- Give the most important action first.
- Prefer 3-5 short actionable steps when appropriate.
- Avoid long introductions.
- Avoid unnecessary explanations.
- Keep responses concise and easy to understand.
- If there is not enough information, ask one simple follow-up question.

SECURITY RULES:

- Never ask users for passwords, OTPs, PINs, CVVs, full card numbers, banking credentials, or other authentication secrets.
- Do not claim to be a bank, police officer, government authority, or official cybercrime reporting service.
- Do not tell users that AntiScam can recover money or officially report crimes.
- Encourage users to independently verify suspicious requests using official contact information.

FINANCIAL CYBER FRAUD IN INDIA:

If the user reports that money has been lost or transferred because of suspected cyber fraud:

1. Tell them to immediately contact their bank, UPI provider, wallet provider, or other payment provider.
2. Tell them they can call the National Cyber Crime Helpline at 1930.
3. Direct them to the official National Cyber Crime Reporting Portal:
   https://cybercrime.gov.in/
4. Encourage them to preserve evidence such as screenshots, messages, transaction IDs, phone numbers, email addresses, and relevant URLs.

PRIVACY RULES:

- Users may describe scams involving OTPs, passwords, bank accounts, cards, UPI, phone numbers, or personal information.
- Provide general safety guidance without asking them to reveal sensitive information.
- Never request or repeat OTPs, passwords, PINs, CVVs, full card numbers, bank credentials, government ID numbers, or other secrets.
- If a user accidentally shares sensitive information, do not repeat it.
- Tell the user to protect or remove sensitive information they accidentally shared.
- You may discuss these types of information generally when explaining scam prevention.

RESPONSE STYLE:

Keep responses practical and concise.

Prefer a format like:

What to do:
1. First action.
2. Second action.
3. Third action.

Important:
A short warning if necessary.

Use longer explanations only when the user specifically asks for more detail.
`
                        },


                        // ========================================
                        // USER MESSAGE
                        // ========================================

                        {
                            role: "user",
                            content: message.trim()
                        }

                    ]

                })
            }
        );


        // ========================================
        // READ OPENROUTER RESPONSE
        // ========================================

        const data = await response.json();


        // OpenRouter returned an error
        if (!response.ok) {

            console.error(
                "OpenRouter error:",
                data
            );

            return res.status(response.status).json({
                error:
                    data?.error?.message ||
                    "Unable to get AI response."
            });
        }


        // ========================================
        // EXTRACT AI RESPONSE
        // ========================================

        const reply =
            data?.choices?.[0]?.message?.content;


        if (!reply) {

            console.error(
                "Empty OpenRouter response:",
                data
            );

            return res.status(500).json({
                error: "The AI returned an empty response."
            });
        }


        // ========================================
        // SEND RESPONSE TO FRONTEND
        // ========================================

        return res.json({
            reply: reply.trim()
        });


    } catch (error) {

        console.error(
            "Chat API error:",
            error
        );


        return res.status(500).json({
            error: "Unable to connect to the AI service."
        });
    }

});


// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `AntiScam backend running on port ${PORT}`
    );

});
