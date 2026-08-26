const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Allow requests from the React frontend
app.use(cors());


// Allow JSON data
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "AntiScam backend is running!"
    });
});

app.post("/api/chat", async (req, res) => {

    const { message } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({
            error: "Message is required."
        });
    }

    try {

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json",

                    "HTTP-Referer":
                        "http://localhost:5173",

                    "X-Title":
                        "AntiScam College Project"
                },

                body: JSON.stringify({

                    model: "openrouter/free",

                    messages: [

                        {
                            role: "system",

                            content: `
You are AntiScam, a cybersecurity awareness assistant.

Your job is to help users recognize and respond to phishing, scams and online fraud.

Rules:
- Give simple and practical scam-safety guidance.
- Never ask for passwords, OTPs, PINs, CVVs, card numbers or banking credentials.
- Do not claim to be a bank, police officer or government authority.
- If the user reports financial cyber fraud in India, advise them to contact their bank or payment provider immediately.
- Tell victims of financial cyber fraud in India that they can call the National Cyber Crime Helpline at 1930.
- Direct users to the official National Cyber Crime Reporting Portal: https://www.cybercrime.gov.in/
- Encourage users to preserve screenshots, transaction IDs, phone numbers, messages and other evidence.
- Keep responses concise and easy to understand.
- If there is not enough information, ask a simple follow-up question.

Privacy Rules:
- Users may describe scams involving OTPs, passwords, bank accounts, phone numbers, cards, UPI, or personal information.
- Provide general safety guidance without asking the user to reveal sensitive information.
- Never request or repeat OTPs, passwords, PINs, CVVs, full card numbers, bank credentials, government ID numbers, or other secrets.
- If the user accidentally provides sensitive information, do not repeat it.
- Tell users to remove or protect sensitive information they accidentally share.
- You may discuss these types of information in general terms when explaining how to stay safe from scams.
`
                        },

                        {
                            role: "user",
                            content: message
                        }

                    ]

                })
            }
        );


        const data = await response.json();


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


        const reply =
            data?.choices?.[0]?.message?.content;


        if (!reply) {

            return res.status(500).json({
                error:
                    "The AI returned an empty response."
            });
        }


        res.json({
            reply: reply
        });


    } catch (error) {

        console.error(
            "Chat API error:",
            error
        );

        res.status(500).json({
            error:
                "Unable to connect to the AI service."
        });
    }

});


// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `AntiScam backend running on port ${PORT}`
    );
});