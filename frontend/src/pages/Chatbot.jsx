import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
    const [step, setStep] = useState(1);
    const [scamType, setScamType] = useState("");
    const [loss, setLoss] = useState("");
    const [result, setResult] = useState(false);

    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);

    function selectScam(type) {
        setScamType(type);
        setStep(2);
    }

    function selectLoss(answer) {
        setLoss(answer);
        setStep(3);
    }

    function showResult() {
        setResult(true);
    }

    function restartAssistant() {
        setStep(1);
        setScamType("");
        setLoss("");
        setResult(false);
    }

    async function sendChatMessage(event) {
        event.preventDefault();

        if (chatLoading) {
            return;
        }

        if (!chatMessage.trim()) {
            return;
        }

        const userMessage = chatMessage.trim();

        setChatMessages((previousMessages) => [
            ...previousMessages,
            {
                role: "user",
                text: userMessage
            }
        ]);

        setChatMessage("");
        setChatLoading(true);

        try {
            const response = await fetch(
                "/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setChatMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    text: data.reply
                }
            ]);
        } catch (error) {
            console.error(error);

            setChatMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    text: "Unable to connect to the AntiScam assistant. Please try again or refer to the official helpline."
                }
            ]);
        } finally {
            setChatLoading(false);
        }
    }

    return (
        <div className="chatbot-page">

            {/* PAGE TITLE & PURPOSE */}
            <header className="scam-help-header">
                <span className="scam-help-badge">INCIDENT & SAFETY GUIDANCE</span>
                <h1>Scam Help</h1>
                <p>
                    Received a suspicious message, call, link, or payment request? 
                    Get simple guidance on what to do next.
                </p>
            </header>

            {/* SECTION 1: GUIDED SCAM HELP */}
            <section className="chatbot-card" aria-label="Guided Scam Help">
                {result ? (
                    <div className="result-box">
                        <div className="result-header">
                            <div className="bot-icon" aria-hidden="true">🛡️</div>
                            <h2>Recommended Next Steps</h2>
                            <p>Immediate actions based on your situation.</p>
                        </div>

                        {loss === "yes" ? (
                            <div className="danger-result">
                                <h3>⚠ Take Action Immediately</h3>
                                <p>
                                    Since you may have lost money or shared sensitive information, take action as soon as possible.
                                </p>
                                <ul>
                                    <li>Contact your bank or payment provider immediately to block cards and net banking.</li>
                                    <li>Change important passwords for your email and banking accounts.</li>
                                    <li>Do not share any more OTPs or verification codes with anyone.</li>
                                    <li>Save screenshots and details of the suspicious conversation as evidence.</li>
                                    <li>
                                        If financial fraud is involved, call the National Cyber Crime Helpline: <strong>1930</strong>.
                                    </li>
                                    <li>Report the incident through the official National Cyber Crime Reporting Portal.</li>
                                </ul>

                                <a
                                    href="https://cybercrime.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="official-report-btn"
                                >
                                    Report Cyber Crime (cybercrime.gov.in) ↗
                                </a>
                            </div>
                        ) : (
                            <div className="safe-result">
                                <h3>✓ You May Still Be Safe</h3>
                                <p>
                                    Since you have not reported losing money or sharing sensitive credentials, focus on preventive action.
                                </p>
                                <ul>
                                    <li>Stop communicating with the suspicious person or account immediately.</li>
                                    <li>Do not click any suspicious links or download attachments.</li>
                                    <li>Block and report the suspicious sender on your phone or messaging app.</li>
                                    <li>Verify suspicious claims independently through verified official numbers.</li>
                                    <li>Stay alert for similar follow-up scam attempts.</li>
                                </ul>

                                <div className="optional-report">
                                    <p>
                                        Still concerned? You can visit the official National Cyber Crime Reporting Portal for reporting options.
                                    </p>
                                    <a
                                        href="https://cybercrime.gov.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="official-info-link"
                                    >
                                        Visit Official Cyber Crime Portal →
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="summary-box">
                            <span>YOUR RESPONSES</span>
                            <p><strong>Scam type:</strong> {scamType}</p>
                            <p><strong>Money or sensitive information shared:</strong> {loss === "yes" ? "Yes" : "No"}</p>
                            <p className="summary-disclaimer">
                                <em>Notice: AntiScam is an educational project providing awareness guidance. It does not replace official police reporting.</em>
                            </p>
                        </div>

                        <button
                            className="restart-assistant-btn"
                            onClick={restartAssistant}
                        >
                            Start Over
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="card-section-header">
                            <span className="section-label">GUIDED HELP</span>
                            <h2>Choose what happened and follow the recommended steps</h2>
                            <p>Select the situation that best matches what you encountered.</p>
                        </div>

                        <div className="chat-progress">
                            <div
                                className="chat-progress-fill"
                                style={{ width: `${step * 33.33}%` }}
                            ></div>
                        </div>

                        {/* STEP 1 */}
                        {step === 1 && (
                            <div className="chat-step">
                                <span className="step-label">STEP 1 OF 3</span>
                                <h3>What type of suspicious activity happened?</h3>

                                <div className="scam-options">
                                    <button onClick={() => selectScam("Suspicious Link or Phishing")}>
                                        🔗 Suspicious Link / Phishing
                                    </button>

                                    <button onClick={() => selectScam("Money or Payment Scam")}>
                                        💳 Money / Payment Scam
                                    </button>

                                    <button onClick={() => selectScam("OTP or Password Request")}>
                                        🔐 OTP / Password Request
                                    </button>

                                    <button onClick={() => selectScam("Social Media Scam")}>
                                        👤 Social Media Scam
                                    </button>

                                    <button onClick={() => selectScam("Online Shopping Scam")}>
                                        📦 Online Shopping Scam
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                            <div className="chat-step">
                                <span className="step-label">STEP 2 OF 3</span>
                                <h3>Did you lose money or share sensitive information?</h3>
                                <p className="step-description">
                                    Sensitive information includes OTPs, passwords, card details, PINs, or net banking credentials.
                                </p>

                                <div className="yes-no-buttons">
                                    <button
                                        className="yes-btn"
                                        onClick={() => selectLoss("yes")}
                                    >
                                        Yes
                                    </button>

                                    <button
                                        className="no-btn"
                                        onClick={() => selectLoss("no")}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                            <div className="chat-step">
                                <span className="step-label">STEP 3 OF 3</span>
                                <h3>Ready to view your recommended safety steps?</h3>
                                <p className="step-description">
                                    We will provide targeted guidance based on the answers you gave.
                                </p>

                                <button
                                    className="show-result-btn"
                                    onClick={showResult}
                                >
                                    Show My Safety Steps →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* SECTION 2: ASK ANTISCAM AI ASSISTANT */}
            <section className="ai-chat-card" aria-label="Ask AntiScam AI Assistant">
                <div className="card-section-header">
                    <span className="section-label">ASK ANTISCAM</span>
                    <h2>Not sure which option fits?</h2>
                    <p>
                        Describe the situation in your own words and AntiScam can provide general safety guidance.
                    </p>
                </div>

                <div className="chat-messages">
                    {chatMessages.length === 0 && (
                        <div className="chat-empty">
                            <span className="empty-icon" aria-hidden="true">💬</span>
                            <p>Have a question about a message, call, or email? Ask below.</p>
                            <span className="empty-hint">Example: "Someone called claiming my electricity bill is overdue and asked me to install an app."</span>
                        </div>
                    )}

                    {chatMessages.map((item, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                item.role === "user"
                                    ? "user-message"
                                    : "assistant-message"
                            }`}
                        >
                            <span className="message-label">
                                {item.role === "user" ? "YOU" : "ANTISCAM"}
                            </span>
                            <p>{item.text}</p>
                        </div>
                    ))}

                    {chatLoading && (
                        <div className="chat-message assistant-message">
                            <span className="message-label">ANTISCAM</span>
                            <p className="typing-text">AntiScam is checking...</p>
                        </div>
                    )}
                </div>

                <form className="ai-chat-form" onSubmit={sendChatMessage}>
                    <textarea
                        value={chatMessage}
                        onChange={(event) => setChatMessage(event.target.value)}
                        placeholder="Describe what happened without sharing passwords, OTPs, PINs, card numbers, or other sensitive information."
                        rows="3"
                        disabled={chatLoading}
                    />

                    <button
                        type="submit"
                        disabled={chatLoading || !chatMessage.trim()}
                    >
                        {chatLoading ? "Checking with AntiScam..." : "Ask AntiScam →"}
                    </button>
                </form>
            </section>

            {/* SECTION 3: OFFICIAL REPORTING CALLOUT */}
            <section className="official-help-card" aria-label="Official Cyber Crime Help">
                <div className="official-help-info">
                    <h3>Need to Report Cybercrime Officially?</h3>
                    <p>
                        AntiScam provides awareness and general guidance. For financial fraud in India, 
                        immediately call the <strong>National Cyber Crime Helpline: 1930</strong> or file an official complaint online.
                    </p>
                </div>

                <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="official-portal-btn"
                >
                    Official Cyber Crime Portal ↗
                </a>
            </section>

        </div>
    );
}

export default Chatbot;