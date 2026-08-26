import { useState } from "react";
import "./Quiz.css";

const questions = [
    {
        question: "What should you do if you receive a suspicious link from an unknown sender?",
        options: [
            "Click the link to check it",
            "Forward it to everyone",
            "Avoid clicking and verify the sender",
            "Enter your personal details"
        ],
        correctAnswer: 2
    },
    {
        question: "Which information should never be shared with anyone?",
        options: [
            "Your favourite colour",
            "Your OTP or password",
            "Your name",
            "Your city"
        ],
        correctAnswer: 1
    },
    {
        question: "A message says you won ₹1,00,000 but asks for a processing fee. What is the safest action?",
        options: [
            "Pay the processing fee",
            "Verify the offer using official sources",
            "Immediately share your bank details",
            "Forward the message to friends"
        ],
        correctAnswer: 1
    },
    {
        question: "What is a common sign of a phishing message?",
        options: [
            "Urgent language asking you to act immediately",
            "A normal message from a verified contact",
            "A saved document on your computer",
            "A message you sent yourself"
        ],
        correctAnswer: 0
    },
    {
        question: "If someone claiming to be from your bank asks for your OTP, what should you do?",
        options: [
            "Share the OTP immediately",
            "Share your password too",
            "Do not share it and contact the bank officially",
            "Send the OTP after checking the caller's name"
        ],
        correctAnswer: 2
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
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {

             localStorage.setItem("quizScore", score);
             localStorage.setItem(
                "quizTotal",
                questions.length
            );
    
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
                        Great job! Keep practicing safe online habits
                        and always verify suspicious messages.
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
                        QUESTION
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

                                {option}
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

                        <p>
                            {selectedAnswer === question.correctAnswer
                                ? "Good job! That is the safest action."
                                : `The correct answer is: ${
                                    question.options[question.correctAnswer]
                                }`
                            }
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