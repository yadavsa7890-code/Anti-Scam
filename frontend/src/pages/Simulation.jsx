import { useState } from "react";
import "./Simulation.css";

const scenarios = [
    {
        title: "Bank Account Alert",
        message:
            "URGENT: Your bank account will be blocked today. Click the link below immediately to verify your account details.",

        options: [
            {
                text: "Click the Link",
                correct: false,
                feedback:
                    "Risky choice! Scammers often use urgent messages to pressure you into clicking suspicious links."
            },
            {
                text: "Ignore the Message",
                correct: true,
                feedback:
                    "Good choice! Do not interact with suspicious messages."
            },
            {
                text: "Verify Using the Official Bank App or Website",
                correct: true,
                feedback:
                    "Excellent! Always verify important messages using the official app, website, or customer service number."
            }
        ]
    },

    {
        title: "Prize Winner Scam",
        message:
            "Congratulations! You have won ₹50,000. To receive your prize, send ₹500 as a processing fee immediately.",

        options: [
            {
                text: "Send ₹500",
                correct: false,
                feedback:
                    "Risky choice! Legitimate prizes generally do not require you to pay money first to receive them."
            },
            {
                text: "Verify the Offer",
                correct: true,
                feedback:
                    "Good choice! Check whether the organisation and offer are genuine before taking action."
            },
            {
                text: "Share the Message with Everyone",
                correct: false,
                feedback:
                    "Be careful! Sharing suspicious messages can help scams spread to more people."
            }
        ]
    },

    {
        title: "Suspicious OTP Request",
        message:
            "Hello, this is your bank. Please share the OTP sent to your phone so we can verify your account.",

        options: [
            {
                text: "Share the OTP",
                correct: false,
                feedback:
                    "Never share your OTP. Banks and legitimate organisations generally do not ask you to reveal it."
            },
            {
                text: "Hang Up and Contact the Bank",
                correct: true,
                feedback:
                    "Correct! Contact the bank using an official number or app instead."
            },
            {
                text: "Send Your Password Too",
                correct: false,
                feedback:
                    "Very risky! Never share passwords or other sensitive authentication information."
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

            setCurrentScenario(currentScenario + 1);
            setSelectedOption(null);

        } else {
            localStorage.setItem("simulationScore", score);
            localStorage.setItem(
                "simulationTotal",
                scenarios.length
            );
            
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
                        You have completed the scam awareness simulation.
                        Remember to stay alert and verify suspicious messages
                        before taking action.
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


                <div className="scenario-box">

                    <span className="scenario-label">
                        SCAM MESSAGE
                    </span>

                    <h2>
                        {scenario.title}
                    </h2>

                    <p>
                        {scenario.message}
                    </p>

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

                            {option.text}

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
                            {
                                scenario.options[selectedOption]
                                    .feedback
                            }
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