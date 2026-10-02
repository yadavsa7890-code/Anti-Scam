const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

// Allow requests from frontend
app.use(cors());

// Allow JSON request bodies
app.use(express.json());

// Handle malformed JSON request bodies
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        if (req.path.startsWith("/api")) {
            return res.status(400).json({
                error: "Invalid JSON request."
            });
        }
    }
    next(err);
});


// ========================================
// SAFETY GUARD HELPERS
// ========================================

// Detect contextual combinations indicating high-risk scam situations
function isHighRiskScamMessage(rawMessage) {
    if (!rawMessage || typeof rawMessage !== "string") return false;
    const text = rawMessage.toLowerCase();

    // Context 1: UPI PIN or PIN to receive money / payment
    const upiPinReceive =
        /(?:upi\s*pin|pin)\b.*(?:receive|receiving|get|accept|credit).*(?:money|payment|cash|amount|funds)/i.test(text) ||
        /(?:receive|receiving|get|accept|credit).*(?:money|payment|cash|amount|funds).*(?:upi\s*pin|pin)\b/i.test(text);

    // Context 2: QR code + UPI PIN / enter PIN / scan to receive money
    const qrPin =
        /qr\s*code.*(?:upi\s*pin|enter\s*(?:your\s*)?pin|scan.*pin|pin.*receive)/i.test(text) ||
        /(?:upi\s*pin|enter\s*(?:your\s*)?pin).*qr\s*code/i.test(text) ||
        /scan\s*(?:a|the|this)?\s*qr\s*code.*(?:receive|get).*(?:money|payment|amount)/i.test(text);

    // Context 3: OTP / verification code sharing, telling, or asking
    const otpSharing =
        /\b(?:otp|one\s*time\s*password|verification\s*code)\b.*(?:share|send|tell|give|provide|enter|reveal|ask|asked|asking|read|submit)/i.test(text) ||
        /(?:share|send|tell|give|provide|enter|reveal|ask|asked|asking|read|submit).*\b(?:otp|one\s*time\s*password|verification\s*code)\b/i.test(text);

    // Context 4: CVV / Banking PIN / ATM PIN sharing or asking
    const cvvSecret =
        /\b(?:cvv|cvc|banking\s*pin|atm\s*pin)\b.*(?:share|send|tell|give|provide|enter|ask|asked)/i.test(text) ||
        /(?:share|send|tell|give|provide|enter|ask|asked).*\b(?:cvv|cvc|banking\s*pin|atm\s*pin)\b/i.test(text);

    // Context 5: Password sharing or asking
    const passwordSecret =
        /\b(?:password|net\s*banking\s*password)\b.*(?:share|send|tell|give|provide|enter|ask|asked)/i.test(text) ||
        /(?:share|send|tell|give|provide|enter|ask|asked).*\b(?:password|net\s*banking\s*password)\b/i.test(text);

    // Context 6: Remote access tools + banking / accounts / payment
    const remoteAccess =
        /(?:anydesk|teamviewer|quicksupport|rustdesk|remote\s*access|screen\s*share).*(?:bank|banking|account|upi|payment|money)/i.test(text) ||
        /(?:bank|banking|account|upi|payment|money).*(?:anydesk|teamviewer|quicksupport|rustdesk|remote\s*access|screen\s*share)/i.test(text);

    // Context 7: UPI collect / payment request to receive money
    const collectReceive =
        /(?:collect\s*request|payment\s*request|approve\s*request).*(?:receive|get).*(?:money|payment)/i.test(text) ||
        /(?:receive|get).*(?:money|payment).*(?:collect\s*request|payment\s*request|approve)/i.test(text);

    // Context 8: Bank impersonation threatening block/freeze asking for OTP/code/action
    const bankThreat =
        /(?:bank|account|debit\s*card|credit\s*card).*(?:blocked|suspended|freeze|expire).*(?:otp|code|link|call|verify)/i.test(text);

    // Context 9: Job / work from home upfront registration fee
    const jobFee =
        /(?:job|work\s*from\s*home|offer\s*letter|recruiter|interview).*(?:registration\s*fee|processing\s*fee|upfront\s*fee|refundable\s*fee|pay\s*(?:a\s*)?fee)/i.test(text);

    return upiPinReceive || qrPin || otpSharing || cvvSecret || passwordSecret || remoteAccess || collectReceive || bankThreat || jobFee;
}

// Validate whether an AI response is dangerously claiming safety for a high-risk situation
function isUnsafeAIReply(reply) {
    if (!reply || typeof reply !== "string") return true;
    const trimmed = reply.trim();
    if (trimmed.length < 40) return true; // Classifier-only or empty response without actionable guidance

    const lower = trimmed.toLowerCase();

    // Reject standalone classifications or classifier labels
    if (/^user\s*safety:\s*(?:safe|unsafe)/i.test(lower)) return true;
    if (lower.includes("safety categories:")) return true;
    if (/^(?:safe|unsafe|scam|phishing)[.!]?$/i.test(lower)) return true;

    // Check dangerous affirmative assertions (unless negated by "not", "never", etc.)
    const dangerousPhrases = [
        /\b(?:this|it|that)\s+is\s+(?:completely\s+|totally\s+|quite\s+)?safe\b/i,
        /\b(?:looks|seems|appears)\s+(?:to\s+be\s+)?safe\b/i,
        /\byou\s+(?:can|should)\s+(?:safely\s+)?proceed\b/i,
        /\bno\s+(?:risk|danger|scam)\s+here\b/i,
        /\bthis\s+is\s+(?:legitimate|genuine)\b/i
    ];

    for (const pattern of dangerousPhrases) {
        const match = lower.match(pattern);
        if (match) {
            const idx = match.index;
            const windowBefore = lower.substring(Math.max(0, idx - 25), idx);
            if (!/\b(?:not|never|no|n't|isn't|unlikely|cannot|don't)\s*$/i.test(windowBefore) && !/\bnot\s+safe\b/i.test(lower)) {
                return true;
            }
        }
    }

    // Must contain action verbs or guidance
    const hasActionableGuidance =
        /\b(?:do\s+not|never|don't|stop|block|verify|contact|report|call|1930|action|steps|what\s+to\s+do|not\s+safe|unsafe|scam|warning)\b/i.test(lower);

    if (!hasActionableGuidance) {
        return true;
    }

    return false;
}

// Reviewed safe fallback guidance for high-risk scam queries
function getSafetyFallback(message) {
    const text = (message || "").toLowerCase();

    // Check for OTP/credential scam
    const isOtp = /\b(?:otp|one\s*time\s*password|verification\s*code|password|cvv)\b/i.test(text);
    // Check for UPI / QR / Payment scam
    const isPayment = /\b(?:upi|pin|qr|collect|payment|money|receive)\b/i.test(text);
    // Check for Job fee scam
    const isJob = /\b(?:job|fee|recruiter|work\s*from\s*home|offer)\b/i.test(text);

    if (isPayment && !isOtp) {
        return (
            "This is a strong scam warning sign.\n\n" +
            "What to do:\n" +
            "1. Do not enter your UPI PIN, scan the QR code, or approve any payment request.\n" +
            "2. In UPI, entering a PIN is ONLY used to send or deduct money from your account. You NEVER need to enter a UPI PIN or scan a QR code to receive money.\n" +
            "3. Stop communicating with the buyer or sender immediately and do not proceed with the transaction.\n" +
            "4. If money has already been deducted or credentials were shared, contact your bank or payment app immediately to freeze payments.\n\n" +
            "For financial cyber fraud in India, call the National Cyber Crime Helpline at 1930 and report through the official portal: https://cybercrime.gov.in/"
        );
    }

    if (isOtp) {
        return (
            "This is a strong scam warning sign.\n\n" +
            "What to do:\n" +
            "1. Never share your OTP, verification code, PIN, password, or CVV with anyone, even if they claim to be from your bank or government.\n" +
            "2. Legitimate banks will never call or message asking for your OTP to verify, unblock, or update your account.\n" +
            "3. Hang up or stop communicating immediately. Do not call any number provided by the suspicious caller.\n" +
            "4. If you have already shared an OTP or credentials, contact your bank immediately to block your cards and net banking accounts.\n\n" +
            "For cyber fraud in India, call the National Cyber Crime Helpline at 1930 and report at: https://cybercrime.gov.in/"
        );
    }

    if (isJob) {
        return (
            "This is a strong scam warning sign.\n\n" +
            "What to do:\n" +
            "1. Do not pay any registration, processing, training, or refundable fee. Legitimate employers never ask candidates to pay for a job or offer letter.\n" +
            "2. Verify the company and job opening independently through their official website or verified careers portal.\n" +
            "3. Stop communicating with the recruiter and do not share identity documents or bank details.\n" +
            "4. Save screenshots of the messages and phone numbers as evidence.\n\n" +
            "For online fraud in India, call the National Cyber Crime Helpline at 1930 and report at: https://cybercrime.gov.in/"
        );
    }

    return (
        "This is a strong scam warning sign.\n\n" +
        "What to do:\n" +
        "1. Do not share your OTP, PIN, password, CVV, or banking details with anyone.\n" +
        "2. Stop communication with the sender or caller immediately.\n" +
        "3. Independently verify the claim using the official website or customer service number of the organization.\n" +
        "4. If sensitive details were shared or money was transferred, contact your bank immediately.\n\n" +
        "For cyber fraud in India, call the National Cyber Crime Helpline at 1930 and report at: https://cybercrime.gov.in/"
    );
}

// Strip markdown bold markers, thinking artifacts, and keep formatting clean and readable
function cleanReplyFormatting(text) {
    if (!text || typeof text !== "string") return "";
    return text
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/^(?:Here's a thinking process|Thinking Process):[\s\S]*?(?=\n\n|\n[A-Z0-9]|$)/i, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/__(.*?)__/g, "$1")
        .replace(/^#+\s+/gm, "")
        .trim();
}

// Detect if OpenRouter returned a quota/rate-limit error (e.g. daily free tier limit)
function isOpenRouterRateLimit(status, errorMessage) {
    if (status === 429) return true;
    if (!errorMessage || typeof errorMessage !== "string") return false;
    const lower = errorMessage.toLowerCase();
    return (
        lower.includes("rate limit") ||
        lower.includes("free-models-per-day") ||
        lower.includes("daily limit") ||
        lower.includes("quota") ||
        lower.includes("too many requests") ||
        (lower.includes("credit") && lower.includes("limit"))
    );
}

// Redact any sensitive tokens/keys before logging to protect secrets
function redactApiKey(str) {
    if (!str || typeof str !== "string") return str;
    const key = process.env.OPENROUTER_API_KEY;
    if (key && key.length > 5) {
        return str.split(key).join("[REDACTED]");
    }
    return str;
}


// ========================================
// API ROUTES
// ========================================

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({
        message: "AntiScam backend is running!"
    });
});

// AntiScam AI Chat endpoint
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

    const isHighRisk = isHighRiskScamMessage(message);

    // 30s timeout for AI response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {

        // ========================================
        // SEND REQUEST TO OPENROUTER
        // ========================================

        const appUrl = process.env.APP_URL || "https://anti-scam-beta.vercel.app";

        let reply = "";
        let lastError = null;

        // Try up to 2 attempts to protect against transient free-tier provider drops
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const response = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",
                        signal: controller.signal,
                        headers: {
                            "Authorization":
                                `Bearer ${process.env.OPENROUTER_API_KEY}`,

                            "Content-Type": "application/json",

                            "HTTP-Referer":
                                appUrl,

                            "X-Title":
                                "AntiScam College Project"
                        },

                        body: JSON.stringify({

                            // Free OpenRouter model router
                            model: "openrouter/free",

                            // Keep responses reasonably short while giving reasoning models room to complete
                            max_tokens: 600,

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

CRITICAL PAYMENT SAFETY RULES:

- Never tell a user that sharing an OTP, UPI PIN, banking PIN, password, CVV, or authentication secret is safe.
- A user should never enter or share a UPI PIN because another person says it is necessary to RECEIVE money.
- In UPI, entering a PIN or scanning a QR code is ONLY used to send or deduct money from your account. You NEVER need to enter a PIN or scan a QR code to receive money.
- If someone tells a user to scan a QR code or enter a UPI PIN to receive money, explicitly warn them NOT to proceed. This is a common scam.
- Treat unexpected UPI collect/payment requests cautiously.
- Never classify a request involving OTP/PIN/password/CVV sharing as safe.
- Good spelling, HTTPS, familiar names, caller knowledge, or a genuine compromised social-media account do not automatically prove legitimacy.
- If a situation contains a clear scam warning sign, explain the warning and provide protective actions.
- Never respond to a potentially dangerous scam situation using only:
  "safe"
  "unsafe"
  "User Safety: safe"
  "User Safety: unsafe"
- Always give a short explanation and actionable guidance for potentially risky situations.

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

PLAIN TEXT & FORMATTING RULES:

- Use plain text only.
- Do NOT use Markdown bold markers (never use ** or __).
- Do NOT use Markdown heading symbols (# or ##).
- Do NOT output internal thoughts or thinking processes.
- Do NOT output classifier tags (never output "User Safety:" or "Safety Categories:"). Output only direct, helpful user advice.
- Simple numbered lists (1., 2., 3.) and bullet points are allowed.
- Keep formatting clean, readable, and in plain text.

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

                if (response.ok) {
                    const data = await response.json();
                    const candidate = data?.choices?.[0]?.message?.content;
                    if (candidate && candidate.trim()) {
                        reply = candidate.trim();
                        break;
                    }
                } else {
                    const status = response.status;
                    let errorMsg = "";
                    try {
                        const rawText = await response.text();
                        try {
                            const errorData = JSON.parse(rawText);
                            errorMsg = (typeof errorData?.error === "string" ? errorData.error : errorData?.error?.message) || errorData?.message || rawText;
                        } catch {
                            errorMsg = rawText;
                        }
                    } catch {
                        errorMsg = "";
                    }
                    lastError = errorMsg || `HTTP ${status}`;

                    // If rate limit / daily free tier quota exceeded, stop retrying immediately
                    if (isOpenRouterRateLimit(status, errorMsg)) {
                        clearTimeout(timeoutId);
                        console.warn("OpenRouter daily limit reached:", redactApiKey(errorMsg || `HTTP ${status}`));
                        return res.status(429).json({
                            error: "AI_DAILY_LIMIT",
                            message: "The AntiScam AI assistant has reached its temporary daily usage limit. Please try again later."
                        });
                    }
                }
            } catch (attemptErr) {
                if (attemptErr.name === "AbortError") throw attemptErr;
                lastError = attemptErr.message;
            }
        }

        clearTimeout(timeoutId);

        // ========================================
        // VALIDATE RESPONSE
        // ========================================

        if (!reply) {
            console.error("OpenRouter response empty after attempts:", redactApiKey(lastError));

            if (isOpenRouterRateLimit(0, lastError)) {
                console.warn("OpenRouter daily limit reached:", redactApiKey(lastError));
                return res.status(429).json({
                    error: "AI_DAILY_LIMIT",
                    message: "The AntiScam AI assistant has reached its temporary daily usage limit. Please try again later."
                });
            }

            if (isHighRisk) {
                return res.json({
                    reply: cleanReplyFormatting(getSafetyFallback(message))
                });
            }

            return res.status(503).json({
                error: "The AI service is temporarily unavailable. Please try again later or refer to the official helpline."
            });
        }

        // Check if high-risk message produced an unsafe or inadequate AI reply
        if (isHighRisk && isUnsafeAIReply(reply)) {
            console.warn("Safety guard triggered: AI returned inadequate or unsafe response for high-risk input. Applying fallback.");
            reply = getSafetyFallback(message);
        } else if (/^user\s*safety:\s*(?:safe|unsafe)/i.test(reply.trim()) && reply.trim().length < 60) {
            reply = "AntiScam provides cybersecurity awareness and scam guidance. Please describe what happened in more detail to receive safety advice.";
        }

        // Clean any stray markdown bold/heading markers
        reply = cleanReplyFormatting(reply);

        // ========================================
        // SEND RESPONSE TO FRONTEND
        // ========================================

        return res.json({
            reply: reply
        });

    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === "AbortError") {
            console.error("OpenRouter request timed out after 30 seconds.");
            return res.status(504).json({
                error: "The AI assistant took too long to respond. Please try again in a moment."
            });
        }

        const safeErrMessage = redactApiKey(error?.message || String(error));
        console.error("Chat API error:", safeErrMessage);

        if (isOpenRouterRateLimit(error.status || 0, error.message)) {
            console.warn("OpenRouter daily limit reached:", safeErrMessage);
            return res.status(429).json({
                error: "AI_DAILY_LIMIT",
                message: "The AntiScam AI assistant has reached its temporary daily usage limit. Please try again later."
            });
        }

        if (isHighRisk) {
            return res.json({
                reply: cleanReplyFormatting(getSafetyFallback(message))
            });
        }

        return res.status(500).json({
            error: "Unable to connect to the AI service."
        });
    }

});


// ========================================
// SERVE STATIC FRONTEND (PRODUCTION / BUILD)
// ========================================

const frontendDistPath = path.join(__dirname, "../frontend/dist");

if (fs.existsSync(frontendDistPath)) {
    // Serve Vite build static assets
    app.use(express.static(frontendDistPath));

    // Support client-side React Router navigation and refreshes
    app.use((req, res, next) => {
        if ((req.method === "GET" || req.method === "HEAD") && !req.path.startsWith("/api")) {
            return res.sendFile(path.join(frontendDistPath, "index.html"));
        }
        next();
    });
} else {
    // Fallback when frontend build does not exist yet (standalone backend dev)
    app.get("/", (req, res) => {
        res.json({
            message: "AntiScam backend is running! (Frontend build not found at frontend/dist)"
        });
    });
}


// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `AntiScam backend running on port ${PORT}`
    );

});
