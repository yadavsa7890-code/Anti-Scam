import { Link } from "react-router-dom";

import learnIcon from "../assets/learn.svg";
import simulation from "../assets/simulation.png";
import quiz from "../assets/quiz.png";
import score from "../assets/score.png";
import chatbot from "../assets/chatbot.png";

import "./Home.css";

const features = [
    {
        id: "learn",
        title: "Learn About Scams",
        path: "/learn",
        image: learnIcon,
        alt: "Learn About Scams icon",
        description: "Understand common scams, warning signs, and simple ways to stay safe."
    },
    {
        id: "simulation",
        title: "Scam Simulator",
        path: "/simulation",
        image: simulation,
        alt: "Scam Simulator icon",
        description: "Practice making safe decisions in realistic scam situations."
    },
    {
        id: "quiz",
        title: "Scam Quiz",
        path: "/quiz",
        image: quiz,
        alt: "Scam Quiz icon",
        description: "Test what you have learned about scams and online safety."
    },
    {
        id: "score",
        title: "Your Scores",
        path: "/score",
        image: score,
        alt: "Your Scores icon",
        description: "Check your Simulator and Quiz performance."
    },
    {
        id: "chatbot",
        title: "Get Scam Help",
        path: "/chatbot",
        image: chatbot,
        alt: "Get Scam Help icon",
        description: "Get guidance when you receive a suspicious message, call, link, or payment request."
    }
];

const steps = [
    {
        number: "01",
        title: "Learn",
        description: "Understand common scams and warning signs."
    },
    {
        number: "02",
        title: "Practice",
        description: "Make decisions in realistic scam scenarios."
    },
    {
        number: "03",
        title: "Test",
        description: "Take the Scam Quiz and check your awareness."
    },
    {
        number: "04",
        title: "Get Help",
        description: "Get guidance when you encounter something suspicious."
    }
];

function Home() {
    return (
        <div className="home-body">

            {/* 1. HERO SECTION */}
            <section className="hero-section">
                <div className="hero-badge">
                    Learn • Practice • Test • Stay Alert
                </div>

                <h1 className="hero-title">
                    Learn to Spot Scams. <span>Stay Safe Online.</span>
                </h1>

                <p className="hero-desc">
                    Learn how online scams work, practice identifying suspicious situations, 
                    test your awareness, and get guidance when something doesn't feel right.
                </p>

                <div className="hero-actions">
                    <Link to="/learn" className="hero-btn primary-btn">
                        Start Learning →
                    </Link>

                    <Link to="/simulation" className="hero-btn secondary-btn">
                        Try Scam Simulator
                    </Link>
                </div>
            </section>

            {/* 2. FEATURE CARDS */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Explore AntiScam Features</h2>
                    <p>Start with awareness, test your instincts, and check your progress.</p>
                </div>

                <div className="main-container">
                    {features.map((feature) => (
                        <Link
                            key={feature.id}
                            to={feature.path}
                            className="feature-card"
                        >
                            <div className="head-container">
                                <img
                                    src={feature.image}
                                    alt={feature.alt}
                                    className="card-logo"
                                />

                                <h3 className="h3">
                                    {feature.title}
                                </h3>
                            </div>

                            <div className="mini-container">
                                <h5 className="h5">
                                    {feature.description}
                                </h5>
                            </div>

                            <span className="card-link-hint">
                                Open {feature.title} →
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. HOW ANTISCAM WORKS (LEARNING JOURNEY) */}
            <section className="journey-section">
                <div className="section-header">
                    <h2>How AntiScam Works</h2>
                    <p>A simple step-by-step path to strengthen your cyber awareness.</p>
                </div>

                <div className="steps-container">
                    {steps.map((step) => (
                        <div key={step.number} className="step-card">
                            <span className="step-number">{step.number}</span>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. SAFETY REMINDER */}
            <section className="safety-reminder-section">
                <div className="safety-reminder-card">
                    <div className="safety-icon" aria-hidden="true">🛡️</div>
                    <div className="safety-text">
                        <h3>Remember: Never share your OTP, PIN, password, or CVV with anyone.</h3>
                        <p>
                            If a message creates urgency or asks for sensitive information, 
                            stop and verify it independently through official channels.
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. OFFICIAL HELP CTA */}
            <section className="help-cta-section">
                <div className="help-cta-card">
                    <h2>Think You May Have Been Scammed?</h2>
                    <p className="help-cta-desc">
                        Get immediate guidance on what steps to take and where to report financial cyber fraud.
                    </p>

                    <div className="help-helpline">
                        <span>National Cyber Crime Helpline:</span>
                        <strong>1930</strong>
                    </div>

                    <div className="help-actions">
                        <Link to="/chatbot" className="help-btn primary-help">
                            Get Guidance
                        </Link>

                        <a
                            href="https://cybercrime.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="help-btn secondary-help"
                        >
                            Official Cyber Crime Portal ↗
                        </a>
                    </div>

                    <p className="help-disclaimer">
                        AntiScam is an educational awareness project. For official police assistance 
                        and fraud investigation in India, file a complaint on cybercrime.gov.in or dial 1930.
                    </p>
                </div>
            </section>

        </div>
    );
}

export default Home;