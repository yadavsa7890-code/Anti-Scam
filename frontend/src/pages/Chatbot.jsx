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
                "http://localhost:5000/api/chat",
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
                throw new Error(
                    data.error || "Something went wrong."
                );
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
                    text:
                        "Unable to connect to the AntiScam assistant."
                }
            ]);

        } finally {
            setChatLoading(false);
        }
    }


    if (result) {

        return (

            <div className="chatbot-page">

                <div className="chatbot-card result-box">

                    <div className="bot-icon">
                        🛡️
                    </div>

                    <h1>Scam Help Assistant</h1>

                    <h2>
                        Recommended Next Steps
                    </h2>


                    {loss === "yes" ? (

                        <div className="danger-result">

                            <h3>⚠ Take Action Immediately</h3>

                            <p>
                                Since you may have lost money or shared
                                sensitive information, take action as soon
                                as possible.
                            </p>

                            <ul>
                                <li>
                                    Contact your bank or payment provider
                                    immediately.
                                </li>

                                <li>
                                    Change important passwords.
                                </li>

                                <li>
                                    Do not share any more OTPs or
                                    verification codes.
                                </li>

                                <li>
                                    Save screenshots and details of the
                                    suspicious conversation.
                                </li>

                                <li>
                                    If financial fraud is involved, call the
                                    National Cyber Crime Helpline at 
                                    <strong> 1930</strong>.
                                </li>
                                
                                <li>
                                    Report the incident through the official
                                    National Cyber Crime Reporting Portal.
                                </li>

                            </ul>

                            <a
                            href="https://www.cybercrime.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="official-report-btn"
                            >
                                Report Cyber Crime
                            </a>

                        </div>

                    ) : (

                        <div className="safe-result">

                            <h3>✓ You May Still Be Safe</h3>

                            <p>
                                Since you have not reported losing money or
                                sharing sensitive information, you can take
                                preventive action.
                            </p>

                            <ul>
                                <li>
                                    Stop communicating with the suspicious
                                    person or account.
                                </li>

                                <li>
                                    Do not click suspicious links.
                                </li>

                                <li>
                                    Block and report the suspicious account.
                                </li>

                                <li>
                                    Verify suspicious messages using
                                    official sources.
                                </li>

                                <li>
                                    Stay alert for similar scam attempts.
                                </li>
                            </ul>

                            <div className="optional-report">
                                <p>
                                    Still concerned? You can visit the official
                                    National Cyber Crime Reporting Portal for
                                    reporting options and information.
                                </p>

                                <a
                                    href="https://www.cybercrime.gov.in/"
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

                        <p>
                            <strong>Scam type:</strong> {scamType}
                        </p>

                        <p>
                            <strong>Money or sensitive information shared:</strong>{" "}
                            {loss === "yes" ? "Yes" : "No"}
                        </p>

                    </div>


                    <button
                        className="restart-assistant-btn"
                        onClick={restartAssistant}
                    >
                        Start Again
                    </button>

                </div>

            </div>

        );
    }


    return (

        <div className="chatbot-page">

            <div className="chatbot-card">

                <div className="chatbot-header">

                    <div className="bot-icon">
                        🤖
                    </div>

                    <div>
                        <h1>Are You Scammed?</h1>

                        <p>
                            Answer a few questions to get safety guidance.
                        </p>
                    </div>

                </div>


                <div className="chat-progress">

                    <div
                        className="chat-progress-fill"
                        style={{
                            width: `${step * 33}%`
                        }}
                    ></div>

                </div>


                {/* STEP 1 */}

                {step === 1 && (

                    <div className="chat-step">

                        <span className="step-label">
                            STEP 1
                        </span>

                        <h2>
                            What type of suspicious activity happened?
                        </h2>


                        <div className="scam-options">

                            <button
                                onClick={() =>
                                    selectScam("Suspicious Link or Phishing")
                                }
                            >
                                🔗 Suspicious Link / Phishing
                            </button>


                            <button
                                onClick={() =>
                                    selectScam("Money or Payment Scam")
                                }
                            >
                                💳 Money / Payment Scam
                            </button>


                            <button
                                onClick={() =>
                                    selectScam("OTP or Password Request")
                                }
                            >
                                🔐 OTP / Password Request
                            </button>


                            <button
                                onClick={() =>
                                    selectScam("Social Media Scam")
                                }
                            >
                                👤 Social Media Scam
                            </button>


                            <button
                                onClick={() =>
                                    selectScam("Online Shopping Scam")
                                }
                            >
                                📦 Online Shopping Scam
                            </button>

                        </div>

                    </div>

                )}


                {/* STEP 2 */}

                {step === 2 && (

                    <div className="chat-step">

                        <span className="step-label">
                            STEP 2
                        </span>

                        <h2>
                            Did you lose money or share sensitive information?
                        </h2>

                        <p className="step-description">
                            Sensitive information includes OTPs, passwords,
                            card details, or banking information.
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

                        <span className="step-label">
                            STEP 3
                        </span>

                        <h2>
                            Are you ready to view the recommended steps?
                        </h2>

                        <p className="step-description">
                            We will show guidance based on the answers
                            you provided.
                        </p>


                        <button
                            className="show-result-btn"
                            onClick={showResult}
                        >
                            Show My Safety Steps →
                        </button>

                    </div>

                )}

            </div>
            
<div className="ai-chat-card">

    {/* AI Chat Heading */}
    <div className="ai-chat-heading">

        <h2>Ask AntiScam</h2>

        <p>
            Have another scam-related question?
            Type it below.
        </p>

    </div>


    {/* Chat Messages */}
    <div className="chat-messages">

        {chatMessages.length === 0 && (

            <div className="chat-empty">
                Ask a scam-related question to start the conversation.
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

                    {item.role === "user"
                        ? "YOU"
                        : "ANTISCAM"
                    }

                </span>

                <p>
                    {item.text}
                </p>

            </div>

        ))}


        {/* Loading Message */}
        {chatLoading && (

            <div className="chat-message assistant-message">

                <span className="message-label">
                    ANTISCAM
                </span>

                <p className="typing-text">
                    Thinking...
                </p>

            </div>

        )}

    </div>


    {/* Message Input */}
    <form
        className="ai-chat-form"
        onSubmit={sendChatMessage}
    >

        <textarea
            value={chatMessage}

            onChange={(event) =>
                setChatMessage(event.target.value)
            }

            placeholder="Describe what happened without sharing passwords, OTPs, PINs, card numbers, or other sensitive information."

            rows="3"
        />


        <button
            type="submit"
            disabled={chatLoading}
        >

            {chatLoading
                ? "Sending..."
                : "Ask AntiScam"
            }

        </button>

    </form>

</div>
        </div>

    );
}

export default Chatbot;