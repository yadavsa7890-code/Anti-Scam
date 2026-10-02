import { useState } from "react";
import "./Quiz.css";

const questions = [
    {
        question: "What is phishing primarily designed to do?",
        options: [
            "Speed up slow internet connections",
            "Trick people into revealing sensitive personal or financial credentials",
            "Automatically scan your device for hardware defects",
            "Prevent unwanted spam emails from reaching your inbox"
        ],
        correctAnswer: 1,
        explanation: "Phishing is a social engineering attack where fraudsters impersonate legitimate organizations to deceive individuals into handing over passwords, OTPs, or financial data."
    },
    {
        question: "Which piece of information should you NEVER share with anyone, even someone claiming to be your bank manager?",
        options: [
            "Your bank branch name",
            "The bank's customer support email",
            "Your One-Time Password (OTP) or UPI PIN",
            "The IFSC code of your branch"
        ],
        correctAnswer: 2,
        explanation: "An OTP and UPI PIN are secret, single-user authentication factors. Genuine bank officials will never ask you to reveal them under any circumstance."
    },
    {
        question: "You receive an unexpected message stating you won ₹25 Lakhs in an international lottery, but you must transfer ₹2,000 for customs tax. What does this mean?",
        options: [
            "It is an advance-fee fraud; legitimate lotteries never ask winners to pay upfront fees",
            "It is a standard administrative tax required before releasing international prize funds",
            "An official bank transfer that requires clearance from local customs officials",
            "A government-sponsored welfare scheme that requires initial account registration"
        ],
        correctAnswer: 0,
        explanation: "You cannot win a contest or lottery you never entered. Demands for advance fees, taxes, or clearance charges to release winnings are always scams."
    },
    {
        question: "What is the key difference between 'Smishing' and 'Vishing'?",
        options: [
            "Smishing occurs on desktop computers, while vishing occurs exclusively on tablets",
            "Smishing targets corporate email accounts, while vishing targets home Wi-Fi networks",
            "Smishing involves cryptocurrency theft, while vishing involves debit card cloning",
            "Smishing uses fraudulent SMS text messages, while vishing uses deceptive phone calls"
        ],
        correctAnswer: 3,
        explanation: "Smishing (SMS phishing) uses deceptive text messages containing urgent claims or malicious links, whereas vishing (voice phishing) uses fraudulent phone calls."
    },
    {
        question: "Which password habit provides the highest protection against credential stuffing and unauthorized account takeovers?",
        options: [
            "Using a unique, strong passphrase for every account combined with Two-Factor Authentication (2FA)",
            "Using the same complex password across all personal, work, and banking accounts",
            "Replacing a single letter with a number in a standard dictionary word",
            "Saving passwords in an unencrypted text file on your desktop"
        ],
        correctAnswer: 0,
        explanation: "Reusing passwords across services means a breach on one site compromises all your accounts. Unique passphrases and 2FA prevent unauthorized logins."
    },
    {
        question: "A buyer on a marketplace app sends you a QR code and asks you to scan it to 'receive' payment. What is the fundamental rule about QR codes and UPI?",
        options: [
            "QR codes can only transfer money between bank accounts at the same physical branch",
            "Entering your UPI PIN is mandatory whenever accepting payments exceeding ₹500",
            "Scanning a payment QR code or entering a UPI PIN always sends money, it NEVER receives money",
            "Scanning a QR code is safe as long as the buyer does not know your mobile number"
        ],
        correctAnswer: 2,
        explanation: "In UPI payment systems, scanning a QR code and entering your PIN is strictly an authorization to DEBIT funds from your account. Receiving money never requires a PIN."
    },
    {
        question: "An unsolicited caller claiming to be bank technical support instructs you to install AnyDesk or TeamViewer QuickSupport. What is their real motive?",
        options: [
            "To update your phone's operating system drivers",
            "To establish a secure, encrypted tunnel required for bank transactions",
            "To verify your phone's GPS location with national payment servers",
            "To remotely view your screen, intercept incoming SMS OTPs, and control your device"
        ],
        correctAnswer: 3,
        explanation: "Remote access apps give callers complete visibility and control over your screen. Scammers watch your screen to capture passwords and incoming OTPs."
    },
    {
        question: "How does Two-Factor Authentication (2FA) significantly increase your security?",
        options: [
            "It requires two independent authentication factors (e.g., password + authenticator code) before granting access",
            "It forces you to enter two different passwords typed in two different languages",
            "It automatically generates a new random password every 24 hours",
            "It creates two duplicate user accounts in case one gets locked"
        ],
        correctAnswer: 0,
        explanation: "2FA combines something you know (password) with something you have (an authenticator app code or security key), preventing unauthorized access even if your password leaks."
    },
    {
        question: "Why can searching Google or social media for customer care numbers of airlines, courier services, or banks be dangerous?",
        options: [
            "Search engines are legally prohibited from displaying commercial contact numbers",
            "Bank telephone lines cannot receive incoming calls originating from mobile networks",
            "Dialing phone numbers listed on search engines immediately infects your phone with malware",
            "Scammers create fake websites and sponsored search ads featuring fraudulent customer helpline numbers"
        ],
        correctAnswer: 3,
        explanation: "Cybercriminals manipulate search ads and fake local business listings with their own numbers. Always find contact details on official apps, verified websites, or your physical bank card."
    },
    {
        question: "If you lose money to cyber fraud in India, what official emergency helpline number and government portal should you reach immediately?",
        options: [
            "Helpline 100 and police.gov.in",
            "Helpline 1930 and https://cybercrime.gov.in/",
            "Helpline 1098 and nationalportal.in",
            "Helpline 139 and indianrailways.gov.in"
        ],
        correctAnswer: 1,
        explanation: "The Ministry of Home Affairs operates the National Cyber Crime Helpline '1930' (formerly 155260) and the Citizen Financial Cyber Fraud Reporting System at cybercrime.gov.in to freeze stolen funds in the golden hours."
    },
    {
        question: "When reporting an online scam to your bank or the cyber police, what evidence is most critical to preserve?",
        options: [
            "Delete the messages and block the number without saving any records",
            "Post the scammer's UPI ID and phone number publicly across your social media channels",
            "Clear screenshots of chats, transaction reference (UTR) numbers, bank statements, and sender headers",
            "Factory reset your phone immediately to erase temporary cache files"
        ],
        correctAnswer: 2,
        explanation: "Transaction reference (UTR) numbers, bank account statements, screenshots of conversation history, and call/SMS timestamps provide investigators with the vital trail needed to track and freeze funds."
    },
    {
        question: "A website uses HTTPS and shows a green or closed padlock icon in the browser address bar. What does this indicate?",
        options: [
            "The website is certified as authentic, safe, and legally approved by government authorities",
            "The connection to the website is encrypted, but the website itself could still be a malicious phishing site",
            "The website cannot steal your credit card details or passwords",
            "The website has been officially verified by your bank's IT security department"
        ],
        correctAnswer: 1,
        explanation: "HTTPS only means the data sent between your browser and that server is encrypted. Scammers can easily obtain free SSL certificates for phishing domains; the padlock does NOT mean the business is trustworthy."
    },
    {
        question: "You receive an email claiming an overdue bill must be paid immediately. The message has flawless grammar, professional logos, and no spelling mistakes. What is the safest conclusion?",
        options: [
            "Flawless grammar and spelling prove the email was genuinely sent by the official company",
            "Phishing messages always contain obvious typographical errors, so this message is verified genuine",
            "Good spelling alone does not prove authenticity; the sender domain, destination link, and context must still be verified",
            "Only certified corporate mail servers have the capability to send emails without typographical mistakes"
        ],
        correctAnswer: 2,
        explanation: "Attackers commonly use polished templates and AI tools to produce grammatically perfect phishing emails. You must examine the actual sender email domain and verify independently through official channels."
    },
    {
        question: "A direct message arrives from your close friend's real social media account urgently asking for ₹5,000 for a family hospital emergency. What is the safest response?",
        options: [
            "Transfer the money immediately because the request originated from their genuine profile",
            "Verify the request with your friend through another trusted communication channel, such as calling them on the phone",
            "Ask the account to confirm their date of birth or pet name inside the same chat window",
            "Send a small token amount first to check whether the payment is received"
        ],
        correctAnswer: 1,
        explanation: "Genuine social media accounts can be compromised through credential leaks or session theft. Always perform out-of-band verification (a phone call or in-person check) before transferring money."
    },
    {
        question: "Which of the following URLs is MOST suspicious if someone claims it is the official online login page for 'examplebank.com'?",
        options: [
            "https://examplebank.com/personal-banking/login",
            "https://netbanking.examplebank.com/login",
            "https://examplebank.com/security/advisory",
            "https://examplebank.com.verify-session-id89.net/login"
        ],
        correctAnswer: 3,
        explanation: "In domain structure, the actual registered domain appears right before the first single forward slash. In option D, the real domain is 'verify-session-id89.net', which is an attacker-controlled deceptive domain."
    }
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const question = questions[currentQuestion];

    function selectAnswer(index) {
        if (selectedAnswer !== null) {
            return;
        }

        setSelectedAnswer(index);

        if (index === question.correctAnswer) {
            setScore((previousScore) => previousScore + 1);
        }
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
        } else {
            localStorage.setItem("quizScore", score);
            localStorage.setItem("quizTotal", questions.length);
            setShowResult(true);
        }
    }

    function restartQuiz() {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowResult(false);
    }

    if (showResult) {
        return (
            <div className="quiz-page">
                <div className="quiz-card result-card">
                    <h1>Quiz Complete!</h1>

                    <div className="final-score">
                        <span>Your Score</span>
                        <strong>
                            {score} / {questions.length}
                        </strong>
                    </div>

                    <p>
                        Great job! Keep practicing safe online habits, question unexpected requests,
                        and always verify suspicious messages through official channels.
                    </p>

                    <button
                        className="restart-btn"
                        onClick={restartQuiz}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <div className="quiz-card">

                <div className="quiz-header">
                    <div>
                        <h1>Scam Quiz</h1>
                        <p>
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                    </div>

                    <div className="quiz-score">
                        Score: {score}
                    </div>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                            width: `${((currentQuestion + 1) / questions.length) * 100}%`
                        }}
                    ></div>
                </div>

                <div className="question-box">
                    <span className="question-label">
                        QUESTION {currentQuestion + 1}
                    </span>

                    <h2>
                        {question.question}
                    </h2>
                </div>

                <div className="quiz-options">
                    {question.options.map((option, index) => {
                        let optionClass = "quiz-option";

                        if (selectedAnswer !== null) {
                            if (index === question.correctAnswer) {
                                optionClass += " correct";
                            }

                            if (
                                index === selectedAnswer &&
                                index !== question.correctAnswer
                            ) {
                                optionClass += " wrong";
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={optionClass}
                                onClick={() => selectAnswer(index)}
                            >
                                <span className="option-letter">
                                    {String.fromCharCode(65 + index)}
                                </span>

                                <span className="option-text">
                                    {option}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {selectedAnswer !== null && (
                    <div
                        className={`quiz-feedback ${
                            selectedAnswer === question.correctAnswer
                                ? "correct-feedback"
                                : "wrong-feedback"
                        }`}
                    >
                        <h3>
                            {selectedAnswer === question.correctAnswer
                                ? "✓ Correct!"
                                : "✗ Incorrect!"
                            }
                        </h3>

                        {selectedAnswer !== question.correctAnswer && (
                            <p className="feedback-answer-line">
                                <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                            </p>
                        )}

                        <p className="feedback-explanation">
                            {question.explanation}
                        </p>
                    </div>
                )}

                {selectedAnswer !== null && (
                    <button
                        className="next-btn"
                        onClick={nextQuestion}
                    >
                        {currentQuestion === questions.length - 1
                            ? "Finish Quiz"
                            : "Next Question →"
                        }
                    </button>
                )}

            </div>
        </div>
    );
}

export default Quiz;