import { Link } from "react-router-dom";
import "./Learn.css";

const commonScams = [
    {
        id: 1,
        title: "Email Phishing",
        badge: "Email",
        whatIsIt: "Fraudulent emails that mimic legitimate companies like banks, tax departments, or subscription services to steal your login credentials or card numbers.",
        example: "'Your account is suspended due to billing failure. Click here to confirm your password and card details within 24 hours.'",
        howToRecognize: "Look for mismatched sender email addresses, generic greetings, urgent countdowns, and links pointing to unofficial domains."
    },
    {
        id: 2,
        title: "SMS & WhatsApp Scams",
        badge: "Messaging",
        whatIsIt: "Deceptive text or chat messages pretending to be courier services, electricity boards, or telecom providers demanding immediate action.",
        example: "'Dear customer, your electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Call officer at 98XXXXXX immediately.'",
        howToRecognize: "Sent from regular mobile numbers rather than official registered sender IDs; uses high panic and asks you to call an unknown number."
    },
    {
        id: 3,
        title: "Fake Bank & Customer Care Calls",
        badge: "Phone Call",
        whatIsIt: "Callers pretending to be bank executives, telecom agents, or tech support claiming your account is blocked or SIM is expiring.",
        example: "'I am calling from head office. Install this QuickSupport or AnyDesk app on your phone so we can complete your pending biometric KYC.'",
        howToRecognize: "Legitimate banks will never ask you to install remote-screen sharing apps, nor will they ask you to reveal your OTP, CVV, or PIN."
    },
    {
        id: 4,
        title: "UPI & Payment Scams",
        badge: "UPI / QR",
        whatIsIt: "Scammers claiming they want to send you money for an item on marketplace apps, but instead sending a UPI 'Collect Request' or fake QR code.",
        example: "'Scan this QR code and enter your UPI PIN to receive ₹15,000 for your used sofa.'",
        howToRecognize: "CRITICAL RULE: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money. UPI PIN is only needed to SEND money."
    },
    {
        id: 5,
        title: "Fake Prize & Lottery Scams",
        badge: "Lottery",
        whatIsIt: "Unexpected messages congratulating you on winning a massive cash lottery, car, or gift voucher in a contest you never entered.",
        example: "'Congratulations! Your mobile number won ₹25 Lakhs in the Mega Kaun Banega Crorepati lucky draw. Pay ₹3,500 tax to release the cheque.'",
        howToRecognize: "Any lottery or prize that requires you to pay an advance 'processing fee', 'customs clearance', or 'GST fee' is 100% fake."
    },
    {
        id: 6,
        title: "Job & Internship Scams",
        badge: "Employment",
        whatIsIt: "Offers promising exorbitant daily pay for simple online work such as liking videos, rating hotels, or doing data entry.",
        example: "'Part-time work from home! Earn ₹3,000 to ₹8,000 daily by liking YouTube videos. Deposit ₹2,000 to unlock premium VIP tasks.'",
        howToRecognize: "No legitimate company charges money from candidates to offer a job or forces you to 'recharge' a wallet to get paid."
    },
    {
        id: 7,
        title: "Social Media & Impersonation Scams",
        badge: "Social Media",
        whatIsIt: "Scammers creating clone profiles of your friends, family, or celebrities, asking for urgent financial assistance.",
        example: "'Hey, I lost my wallet while traveling and need ₹10,000 for a medical emergency right now. Please UPI to this hospital account.'",
        howToRecognize: "Always call the friend or family member on their known regular phone number directly to verify before transferring any funds."
    },
    {
        id: 8,
        title: "Fake Websites & Shortened Links",
        badge: "Web / URLs",
        whatIsIt: "Copycat websites designed to look identical to net banking, e-commerce, or government portals with slight typos in the domain name.",
        example: "'sbi-online-portal.in' or 'netfIix-security.xyz' instead of the authentic official domains.",
        howToRecognize: "Inspect the browser URL bar carefully. Look out for misspelled words, unusual extensions (.top, .xyz, .cc), and suspicious URL shorteners."
    }
];

const redFlags = [
    {
        title: "Artificial Urgency & Threatening Tone",
        desc: "Phrases like 'Account blocked in 2 hours', 'Legal police action', or 'Power disconnected tonight' are designed to panic you into acting without thinking."
    },
    {
        title: "Demands for Secrets (OTP, PIN, CVV, Password)",
        desc: "No bank, payment provider, or government official will ever ask you to disclose your OTP, UPI PIN, ATM PIN, or card CVV."
    },
    {
        title: "Shortened or Misspelled Links",
        desc: "Links like bit.ly, tinyurl, or domains with subtle typos (e.g., 'amaz0n' instead of 'amazon') lead to credential-stealing phishing clones."
    },
    {
        title: "Pay Money to Receive Money",
        desc: "Being asked to pay a 'registration fee', 'customs duty', or 'processing charge' to unlock a prize, refund, loan, or salary."
    },
    {
        title: "Requests to Install Remote Access Apps",
        desc: "Asking you to download apps like AnyDesk, TeamViewer, or RustDesk gives fraudsters full access to see your screen and read your OTPs."
    },
    {
        title: "Unsolicited Offers Too Good to Be True",
        desc: "High returns on unknown crypto schemes, 90% discount on luxury electronics, or guaranteed lottery wins without entering."
    }
];

const safetyRules = [
    {
        icon: "🔐",
        title: "Never Share Sensitive Credentials",
        detail: "Keep your OTPs, UPI PINs, ATM PINs, CVVs, and passwords strictly private. They are the keys to your money."
    },
    {
        icon: "🔍",
        title: "Verify Through Official Channels",
        detail: "When in doubt, open the bank's official app or search for their customer care number directly on their official website."
    },
    {
        icon: "🚫",
        title: "Avoid Clicking Unsolicited Links",
        detail: "Never tap on random links received via SMS, WhatsApp, or emails from unknown senders. Type the website address manually."
    },
    {
        icon: "🛡️",
        title: "Enable Two-Factor Authentication (2FA)",
        detail: "Turn on 2FA using authenticator apps or SMS codes on all your email, banking, and social media accounts."
    },
    {
        icon: "📱",
        title: "Remember the UPI Rule",
        detail: "You only enter a UPI PIN to DEDUCT money from your account. Receiving money never requires a PIN or scanning a QR code."
    },
    {
        icon: "🛑",
        title: "Say NO to Remote Screen Apps",
        detail: "Never install remote-sharing applications because an unknown caller claims it is necessary for KYC or technical support."
    }
];

function Learn() {
    return (
        <div className="learn-page">
            <div className="learn-container">

                {/* Section A: Introduction */}
                <header className="learn-header">
                    <span className="learn-tag">AWARENESS & EDUCATION</span>
                    <h1>Learn About Online Scams</h1>
                    <p className="learn-intro">
                        Cybercriminals rely on manipulation, urgency, and deceptive technology to trick individuals 
                        into giving away money or confidential information. Building awareness is your strongest defense.
                    </p>

                    <div className="intro-definitions-grid">
                        <div className="def-card">
                            <h3>What is an Online Scam?</h3>
                            <p>
                                An online scam is a fraudulent scheme carried out over the internet, phone, or messaging 
                                apps with the intent of deceiving people for financial or identity theft.
                            </p>
                        </div>

                        <div className="def-card">
                            <h3>What is Phishing?</h3>
                            <p>
                                Phishing is a social engineering technique where attackers impersonate trustworthy 
                                organizations via email, SMS, or fake websites to steal passwords and payment details.
                            </p>
                        </div>

                        <div className="def-card">
                            <h3>What is Online Fraud?</h3>
                            <p>
                                Online fraud covers illegal digital activities—including fake investments, UPI payment 
                                traps, and identity theft—aimed at causing direct financial loss to victims.
                            </p>
                        </div>

                        <div className="def-card">
                            <h3>Why Awareness Matters</h3>
                            <p>
                                Technical firewalls and antivirus tools cannot protect you if you willingly share an OTP 
                                or authorize a scam transaction. Knowledge is the ultimate security layer.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Section B: Common Types of Scams */}
                <section className="learn-section">
                    <div className="section-title-wrap">
                        <h2>Common Types of Online Scams</h2>
                        <p>Explore the most frequent deceptive patterns used by cybercriminals today.</p>
                    </div>

                    <div className="scams-grid">
                        {commonScams.map((scam) => (
                            <div key={scam.id} className="scam-type-card">
                                <div className="card-top">
                                    <span className="scam-badge">{scam.badge}</span>
                                    <span className="scam-num">#{scam.id}</span>
                                </div>

                                <h3>{scam.title}</h3>

                                <div className="scam-detail-block">
                                    <strong>What It Is:</strong>
                                    <p>{scam.whatIsIt}</p>
                                </div>

                                <div className="scam-example-box">
                                    <span className="example-label">Example Scam Message</span>
                                    <p>{scam.example}</p>
                                </div>

                                <div className="scam-detail-block recognize-block">
                                    <strong>How to Recognize It:</strong>
                                    <p>{scam.howToRecognize}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section C: Common Red Flags */}
                <section className="learn-section">
                    <div className="section-title-wrap">
                        <h2>Common Red Flags to Watch Out For</h2>
                        <p>If you observe any of these warning signs, pause and inspect the situation immediately.</p>
                    </div>

                    <div className="red-flags-grid">
                        {redFlags.map((flag, index) => (
                            <div key={index} className="red-flag-card">
                                <div className="flag-icon">⚠️</div>
                                <div className="flag-content">
                                    <h3>{flag.title}</h3>
                                    <p>{flag.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section D: How to Stay Safe */}
                <section className="learn-section">
                    <div className="section-title-wrap">
                        <h2>Essential Rules to Stay Safe Online</h2>
                        <p>Follow these practical safety habits to protect yourself and your family.</p>
                    </div>

                    <div className="safety-grid">
                        {safetyRules.map((rule, index) => (
                            <div key={index} className="safety-card">
                                <div className="safety-icon">{rule.icon}</div>
                                <h3>{rule.title}</h3>
                                <p>{rule.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section E: If You Have Been Scammed */}
                <section className="learn-section incident-section">
                    <div className="incident-card">
                        <div className="incident-header">
                            <span className="incident-alert-badge">EMERGENCY RESPONSE</span>
                            <h2>What to Do If You Have Been Scammed</h2>
                            <p>Act swiftly—immediate reporting maximizes the chance of freezing lost funds.</p>
                        </div>

                        <div className="incident-steps-grid">
                            <div className="incident-step">
                                <span className="step-num">1</span>
                                <h4>Stop Communication Immediately</h4>
                                <p>Cut off all contact with the scammer. Block their phone number, email, and social accounts.</p>
                            </div>

                            <div className="incident-step">
                                <span className="step-num">2</span>
                                <h4>Alert Your Bank / Payment App</h4>
                                <p>Call your bank immediately to block your debit/credit cards, freeze net banking, and stop unauthorized UPI transfers.</p>
                            </div>

                            <div className="incident-step">
                                <span className="step-num">3</span>
                                <h4>Preserve Vital Evidence</h4>
                                <p>Take clear screenshots of chat messages, payment receipts, UTR/transaction numbers, phone numbers, and web URLs.</p>
                            </div>

                            <div className="incident-step">
                                <span className="step-num">4</span>
                                <h4>Call the National Cyber Crime Helpline</h4>
                                <p>In India, dial <strong>1930</strong> immediately for financial cyber fraud assistance (Golden Hour response).</p>
                            </div>
                        </div>

                        <div className="helpline-callout">
                            <div className="helpline-info">
                                <h3>Official Government Reporting</h3>
                                <p>
                                    AntiScam is an educational awareness project. To officially report cybercrime or financial fraud in India, 
                                    always file a complaint with the National Cyber Crime Reporting Portal or call the 1930 helpline.
                                </p>
                                <div className="helpline-badges">
                                    <span className="helpline-badge">National Cyber Crime Helpline: 1930</span>
                                </div>
                            </div>

                            <a
                                href="https://cybercrime.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cybercrime-btn"
                            >
                                Visit Cyber Crime Portal →
                            </a>
                        </div>
                    </div>
                </section>

                {/* Section F: Learning Flow CTA */}
                <section className="learn-flow-section">
                    <h2>Ready to test what you've learned?</h2>
                    <p>Put your scam detection knowledge into action with our interactive tools.</p>

                    <div className="flow-buttons">
                        <Link to="/simulation" className="flow-btn primary-flow">
                            Scam Simulator →
                        </Link>

                        <Link to="/quiz" className="flow-btn secondary-flow">
                            Scam Quiz →
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default Learn;
