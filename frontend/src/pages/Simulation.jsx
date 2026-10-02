import { useState } from "react";
import "./Simulation.css";

const scenarios = [
    {
        id: 1,
        title: "Bank Account KYC Update Notice",
        channel: "SMS",
        channelIcon: "📱",
        sender: "Sender: VM-HDFCBK",
        time: "11:42 AM",
        message: "Dear Customer, Your bank account requires mandatory KYC re-verification before 6:00 PM today to avoid temporary suspension of UPI and debit card services. Update your details now: https://hdfc-kyc-portal.net/verify",
        options: [
            {
                text: "Open the link and submit your Aadhaar and account details to prevent account suspension",
                correct: false,
                feedback: "Risky decision! Scammers create false urgency with deadlines. Banks never send third-party links requesting sensitive KYC credentials."
            },
            {
                text: "Reply to the SMS asking if you can complete verification tomorrow morning instead",
                correct: false,
                feedback: "Risky decision! Replying to fraudulent SMS headers validates your active phone number and can trigger more aggressive scam attempts."
            },
            {
                text: "Do not click the link. Open the bank's official mobile app or visit your local branch independently to check account status",
                correct: true,
                feedback: "Best safe action! When an urgent account alert arrives, always verify status independently through official banking channels without tapping message links."
            }
        ]
    },
    {
        id: 2,
        title: "SIM Card 5G Upgrade & Verification Call",
        channel: "PHONE CALL",
        channelIcon: "📞",
        sender: "Caller: +91 98201 44512 (Claiming to be Telecom Customer Support)",
        time: "Incoming Call",
        message: "'Sir, we are upgrading your SIM to 5G priority network today at no extra cost. A one-time verification code has been sent to your phone. Please read out the 6-digit OTP so we can activate your 5G service.'",
        options: [
            {
                text: "Read out the OTP because the upgrade is free and the caller sounds professional",
                correct: false,
                feedback: "Risky decision! The caller is trying to authorize a SIM swap or fraudulent account login using your OTP."
            },
            {
                text: "Refuse to share the code, hang up immediately, and report the suspicious number",
                correct: true,
                feedback: "Best safe action! Never share any OTP or verification code over the phone with anyone, even if they claim to be official support."
            },
            {
                text: "Ask the caller to first confirm your date of birth before you give the OTP",
                correct: false,
                feedback: "Risky decision! Scammers often obtain public personal information from data leaks to sound convincing. An OTP must never be shared."
            }
        ]
    },
    {
        id: 3,
        title: "International Reward & Customs Processing Fee",
        channel: "WHATSAPP",
        channelIcon: "💬",
        sender: "Unknown (+44 7700 900143)",
        time: "10:14 AM",
        message: "Congratulations! Your mobile number won 2nd Prize in the Global Mobile Lucky Draw (₹15,00,000). To release your demand draft from airport customs, transfer ₹1,999 clearance fee via UPI within 2 hours.",
        options: [
            {
                text: "Recognize this as an advance-fee scam, block the number, and do not transfer any money",
                correct: true,
                feedback: "Best safe action! You cannot win a contest or lottery you never entered. Demands for advance fees or clearance charges are always scams."
            },
            {
                text: "Pay the ₹1,999 fee immediately because ₹15 Lakhs is a massive reward",
                correct: false,
                feedback: "Risky decision! Legitimate lotteries never require winners to pay advance fees or customs taxes via personal UPI transfers."
            },
            {
                text: "Reply and ask the sender to deduct the ₹1,999 fee directly from the ₹15,00,000 prize cheque",
                correct: false,
                feedback: "Risky decision! Engaging with scammers allows them to present forged documents and manipulate you into sending money."
            }
        ]
    },
    {
        id: 4,
        title: "Marketplace Payment & UPI Collect Request",
        channel: "UPI REQUEST",
        channelIcon: "💳",
        sender: "Payment App Notification: 'Collect Request from Buyer99'",
        time: "1:45 PM",
        message: "You listed an old sofa on an online classifieds site. A buyer says: 'I have transferred ₹8,000 to you. You will see a collect request in your PhonePe / GPay app. Tap Pay and enter your UPI PIN to approve the receipt of funds.'",
        options: [
            {
                text: "Decline the collect request immediately. You NEVER enter a UPI PIN to receive money",
                correct: true,
                feedback: "Best safe action! Receiving money through UPI NEVER requires entering your UPI PIN. Entering your PIN always authorizes a debit."
            },
            {
                text: "Approve the request and enter your UPI PIN since the buyer already confirmed the deal",
                correct: false,
                feedback: "Risky decision! Entering your UPI PIN authorizes the transfer of ₹8,000 OUT of your account to the scammer."
            },
            {
                text: "Enter a wrong UPI PIN three times to test if the transaction is real",
                correct: false,
                feedback: "Risky decision! Interacting with fraudulent collect requests risks accidentally entering your real PIN or locking your UPI profile."
            }
        ]
    },
    {
        id: 5,
        title: "Undelivered Parcel Address Verification",
        channel: "SMS",
        channelIcon: "📦",
        sender: "Sender: BX-SPEEDP",
        time: "Today, 11:30 AM",
        message: "Package delivery notice: Consignment #SP90812 cannot be dispatched due to missing street address. Pay ₹25 re-routing fee and update address at http://speedpost-tracking-india.org within 24 hours to prevent return.",
        options: [
            {
                text: "Pay ₹25 quickly using your debit card since ₹25 is too small to be a major scam",
                correct: false,
                feedback: "Risky decision! Scammers use tiny fees (₹10–₹25) to trick victims into entering card numbers, CVVs, and OTPs on phishing gateways."
            },
            {
                text: "Forward the SMS to friends or family to ask if they ordered any courier parcel",
                correct: false,
                feedback: "Risky decision! Forwarding unverified phishing links spreads fraud risk to others."
            },
            {
                text: "Open your actual shopping app or the courier's official verified portal independently to check the tracking ID",
                correct: true,
                feedback: "Best safe action! Postal and courier services do not demand payments through unverified web links. Always verify tracking independently."
            }
        ]
    },
    {
        id: 6,
        title: "Card Security Alert & Remote Assistance App",
        channel: "PHONE CALL",
        channelIcon: "📞",
        sender: "Caller: +91 70012 34567 (Claiming to be Bank Technical Support)",
        time: "Incoming Call",
        message: "'Hello, we detected an unauthorized international transaction on your card. To freeze the transaction immediately, please install the AnyDesk or TeamViewer QuickSupport app from Play Store so our executive can assist you.'",
        options: [
            {
                text: "Install the application right away so the executive can quickly save your funds",
                correct: false,
                feedback: "Risky decision! Screen-sharing apps allow scammers to view your screen, read your SMS OTPs, and take full control of your banking apps."
            },
            {
                text: "Refuse, terminate the call, and contact the official customer care number printed on the back of your debit card",
                correct: true,
                feedback: "Best safe action! Legitimate banks and support teams will NEVER ask you to download remote-access or screen-sharing software."
            },
            {
                text: "Download the app but disconnect your Wi-Fi after opening it",
                correct: false,
                feedback: "Risky decision! Installing software at the direction of an unsolicited caller is extremely dangerous."
            }
        ]
    },
    {
        id: 7,
        title: "Online Video Rating / Part-Time Job Offer",
        channel: "WHATSAPP",
        channelIcon: "💼",
        sender: "HR Recruiter (+91 91234 56789)",
        time: "3:15 PM",
        message: "'Earn ₹3,000–₹5,000 daily by simply liking videos and reviewing hotels. To activate your task account and access daily payouts, deposit a refundable security verification fee of ₹1,500 into our company wallet.'",
        options: [
            {
                text: "Reject the offer and block the contact, as genuine employers never ask candidates to pay money for job assignments",
                correct: true,
                feedback: "Best safe action! Legitimate employers never charge application fees, registration deposits, or wallet activation charges."
            },
            {
                text: "Pay the ₹1,500 security deposit since it is refundable and the daily income is high",
                correct: false,
                feedback: "Risky decision! Task and job scams demand upfront deposits for fake 'wallet activation'. Once you pay, they invent more fees and never return the money."
            },
            {
                text: "Complete a few unpaid tasks first and ask them to waive the deposit later",
                correct: false,
                feedback: "Risky decision! Engaging with task scams draws you deeper into psychological manipulation and financial loss."
            }
        ]
    },
    {
        id: 8,
        title: "Emergency Hospital Bill Help Request",
        channel: "SOCIAL MEDIA",
        channelIcon: "👥",
        sender: "Direct Message from Close Friend's Real Account",
        time: "8:20 PM",
        message: "'Hey, I am at the hospital with my cousin right now and my UPI app is failing due to a server glitch. Could you please send ₹6,000 to this UPI ID (doc-care99@upi)? I will pay you back in cash first thing tomorrow.'",
        options: [
            {
                text: "Send the money right away because the message came from your friend's real profile",
                correct: false,
                feedback: "Risky decision! Social media accounts are frequently hacked or hijacked. Never transfer money solely based on chat messages."
            },
            {
                text: "Ask the chat account to send a selfie from the hospital room as proof",
                correct: false,
                feedback: "Risky decision! Scammers often have access to private photos in compromised accounts or use excuses to keep the chat active."
            },
            {
                text: "Call your friend directly on their regular phone number or meet them to verify before sending any money",
                correct: true,
                feedback: "Best safe action! Always verify urgent money requests using an independent, out-of-band communication channel (like a regular phone call)."
            }
        ]
    },
    {
        id: 9,
        title: "Official-Looking Login Page with HTTPS Padlock",
        channel: "WEBSITE",
        channelIcon: "🌐",
        sender: "Email Link: 'Security Alert: Password Expired'",
        time: "4:05 PM",
        message: "You click a password-reset notice and land on a page that looks identical to your bank's portal with a valid HTTPS padlock icon. The address bar displays: 'https://onlinesbi.bank-portal-security.co.in/login.php'.",
        options: [
            {
                text: "The page has a secure padlock and proper bank colors, so it is safe to enter your username and password",
                correct: false,
                feedback: "Risky decision! HTTPS only means the connection is encrypted; anyone (including scammers) can obtain a free SSL certificate for a fake domain."
            },
            {
                text: "Close the browser tab immediately. The actual domain is 'bank-portal-security.co.in', not the official bank website",
                correct: true,
                feedback: "Best safe action! Always check the primary domain name before the first single slash. Scammers register lookalike domains with HTTPS certificates."
            },
            {
                text: "Enter a fake username first; if it says incorrect, the site must be the real bank",
                correct: false,
                feedback: "Risky decision! Phishing sites record any submitted text without validating it against the bank's actual database."
            }
        ]
    },
    {
        id: 10,
        title: "Scan QR Code to Receive Refund / Advance",
        channel: "WHATSAPP",
        channelIcon: "📷",
        sender: "Interested Buyer on OLX (+91 99887 76655)",
        time: "5:30 PM",
        message: "A buyer sends you an image of a QR code and says: 'My company account can only pay through QR codes. Open your Google Pay or Paytm, scan this QR code, and your ₹5,000 will be credited directly to your bank account.'",
        options: [
            {
                text: "Refuse to scan the QR code. Inform the buyer that receiving money never requires scanning a code",
                correct: true,
                feedback: "Best safe action! QR codes are only scanned to PAY someone. You never scan a QR code or enter your PIN to receive money."
            },
            {
                text: "Scan the QR code in your payment app and press confirm to accept the ₹5,000",
                correct: false,
                feedback: "Risky decision! Scanning a payment QR code and confirming ALWAYS sends money from your account, it never receives money."
            },
            {
                text: "Scan the QR code using a normal camera app first to see the money details",
                correct: false,
                feedback: "Risky decision! Scanning opens payment deep-links that prompt payment apps to transfer money."
            }
        ]
    }
];

function Simulation() {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const scenario = scenarios[currentScenario];

    function handleOptionClick(option, index) {
        if (selectedOption !== null) {
            return;
        }

        setSelectedOption(index);

        if (option.correct) {
            setScore((previousScore) => previousScore + 1);
        }
    }

    function nextScenario() {
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario((prev) => prev + 1);
            setSelectedOption(null);
        } else {
            localStorage.setItem("simulationScore", score);
            localStorage.setItem("simulationTotal", scenarios.length);
            setFinished(true);
        }
    }

    function restartSimulation() {
        setCurrentScenario(0);
        setSelectedOption(null);
        setScore(0);
        setFinished(false);
    }

    if (finished) {
        return (
            <div className="simulation-page">
                <div className="simulation-card result-card">
                    <h1>Simulation Complete!</h1>

                    <div className="final-score">
                        <span>Your Score</span>
                        <strong>
                            {score} / {scenarios.length}
                        </strong>
                    </div>

                    <p>
                        You have completed all {scenarios.length} scam awareness scenarios.
                        Remember to stay alert, question unexpected urgency, and verify before taking action.
                    </p>

                    <button
                        className="restart-btn"
                        onClick={restartSimulation}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="simulation-page">
            <div className="simulation-card">

                <div className="simulation-header">
                    <div>
                        <h1>Scam Simulator</h1>
                        <p>
                            Scenario {currentScenario + 1} of {scenarios.length}
                        </p>
                    </div>

                    <div className="simulation-score">
                        Score: {score}
                    </div>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                            width: `${((currentScenario + 1) / scenarios.length) * 100}%`
                        }}
                    ></div>
                </div>

                {/* Simulated Device / Message Box */}
                <div className="scenario-box">
                    <div className="message-panel-header">
                        <span className="channel-badge">
                            {scenario.channelIcon} {scenario.channel}
                        </span>
                        <span className="message-time">{scenario.time}</span>
                    </div>

                    <div className="sender-meta">
                        {scenario.sender}
                    </div>

                    <h2>{scenario.title}</h2>

                    <div className="realistic-message-bubble">
                        <p>{scenario.message}</p>
                    </div>
                </div>

                <h3 className="question">
                    What would you do?
                </h3>

                <div className="options">
                    {scenario.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${
                                selectedOption === index
                                    ? option.correct
                                        ? "correct"
                                        : "wrong"
                                    : ""
                            }`}
                            onClick={() =>
                                handleOptionClick(option, index)
                            }
                        >
                            <span className="option-marker">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="option-text">
                                {option.text}
                            </span>
                        </button>
                    ))}
                </div>

                {selectedOption !== null && (
                    <div
                        className={`feedback ${
                            scenario.options[selectedOption].correct
                                ? "correct-feedback"
                                : "wrong-feedback"
                        }`}
                    >
                        <h3>
                            {scenario.options[selectedOption].correct
                                ? "✓ Good Decision!"
                                : "⚠ Risky Decision!"
                            }
                        </h3>

                        <p>
                            {scenario.options[selectedOption].feedback}
                        </p>
                    </div>
                )}

                {selectedOption !== null && (
                    <button
                        className="next-btn"
                        onClick={nextScenario}
                    >
                        {currentScenario === scenarios.length - 1
                            ? "Finish Simulation"
                            : "Next Scenario →"
                        }
                    </button>
                )}

            </div>
        </div>
    );
}

export default Simulation;