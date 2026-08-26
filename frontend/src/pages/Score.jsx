import "./Score.css";

function Score() {

    const savedSimulationScore = localStorage.getItem("simulationScore");
    const savedSimulationTotal = localStorage.getItem("simulationTotal");

    const savedQuizScore = localStorage.getItem("quizScore");
    const savedQuizTotal = localStorage.getItem("quizTotal");

    const simulationAttempted = savedSimulationScore !== null;
    const quizAttempted = savedQuizScore !== null;

    const simulationScore = simulationAttempted
        ? Number(savedSimulationScore)
        : 0;

    const simulationTotal = savedSimulationTotal
        ? Number(savedSimulationTotal)
        : 3;

    const quizScore = quizAttempted
        ? Number(savedQuizScore)
        : 0;

    const quizTotal = savedQuizTotal
        ? Number(savedQuizTotal)
        : 5;

    const totalScore =
        (simulationAttempted ? simulationScore : 0) +
        (quizAttempted ? quizScore : 0);

    const totalQuestions =
        (simulationAttempted ? simulationTotal : 0) +
        (quizAttempted ? quizTotal : 0);
    const percentage =
        totalQuestions > 0
            ? Math.round((totalScore / totalQuestions) * 100)
            : 0;


    const anyAttempted =
        simulationAttempted || quizAttempted;

    let performance;
    let message;

    if (!anyAttempted) {
        performance = "No Attempts Yet";
        message =
            "Complete the Scam Simulator or Scam Quiz to view your performance.";

    } else if (percentage >= 80) {
        performance = "Excellent!";
        message =
            "You have strong awareness about online scams and safe practices.";

    } else if (percentage >= 50) {
        performance = "Good Job!";
        message =
            "You understand many scam warning signs, but there is still more to learn.";

    } else {
        performance = "Keep Learning!";
        message =
            "Practice more scenarios and quizzes to improve your scam awareness.";
    }


    function resetScores() {

        localStorage.removeItem("simulationScore");
        localStorage.removeItem("simulationTotal");
        localStorage.removeItem("quizScore");
        localStorage.removeItem("quizTotal");

        window.location.reload();
    }


    return (

        <div className="score-page">

            <div className="score-container">

                <div className="score-heading">

                    <h1>Your Scores</h1>

                    <p>
                        Track your progress and test your scam awareness.
                    </p>

                </div>


                <div className="score-cards">

                    <div className="score-card">

                        <span className="score-label">
                            SCAM SIMULATOR
                        </span>

                        <h2>
                            {simulationAttempted
                            ? `${simulationScore} / ${simulationTotal}`
                            : "Not Attempted"}
                        </h2>

                        <p>
                            Your score from the scam simulation.
                        </p>

                    </div>


                    <div className="score-card">

                        <span className="score-label">
                            SCAM QUIZ
                        </span>

                        <h2>
                            {quizAttempted
                            ? `${quizScore} / ${quizTotal}`
                            : "Not Attempted"}
                        </h2>

                        <p>
                            Your score from the scam awareness quiz.
                        </p>

                    </div>

                </div>


                <div className="overall-card">

                    <span className="score-label">
                        OVERALL PERFORMANCE
                    </span>

                    <div className="percentage">
                        {anyAttempted
                        ? `${percentage}%`
                        : "--"}
                    </div>

                    <h2>
                        {performance}
                    </h2>

                    <p>
                        {message}
                    </p>

                    <div className="percentage-bar">

                        <div
                            className="percentage-progress"
                            style={{
                                width: anyAttempted
                                ? `${percentage}%`
                                : "0%"
                            }}
                        ></div>

                    </div>

                </div>


                <button
                    className="reset-score-btn"
                    onClick={resetScores}
                >
                    Reset Scores
                </button>

            </div>

        </div>

    );
}

export default Score;