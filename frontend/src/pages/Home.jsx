import { Link } from "react-router-dom";

import simulation from "../assets/simulation.png";
import quiz from "../assets/quiz.png";
import score from "../assets/score.png";
import chatbot from "../assets/chatbot.png";

import "./Home.css";

function Home() {

    return (

        <div className="home-body">

            <h1 className="title">
                Welcome, what would you like to do <span>today?</span>
            </h1>

            <div className="main-container">


                <Link
                    to="/simulation"
                    className="feature-card"
                >

                    <div className="head-container">

                        <img
                            src={simulation}
                            alt="Scam Simulator"
                            className="card-logo"
                        />

                        <h3 className="h3">
                            Scam Simulator
                        </h3>

                    </div>

                    <div className="mini-container">

                        <h5 className="h5">
                            Practice realistic scam scenarios and
                            learn how to respond safely.
                        </h5>

                    </div>

                </Link>


                <Link
                    to="/quiz"
                    className="feature-card"
                >

                    <div className="head-container">

                        <img
                            src={quiz}
                            alt="Quiz"
                            className="card-logo"
                        />

                        <h3 className="h3">
                            Scam Quiz
                        </h3>

                    </div>

                    <div className="mini-container">

                        <h5 className="h5">
                            Run a quiz to test what you have learned.
                        </h5>

                    </div>

                </Link>


                <Link
                    to="/score"
                    className="feature-card"
                >

                    <div className="head-container">

                        <img
                            src={score}
                            alt="Your Score"
                            className="card-logo"
                        />

                        <h3 className="h3">
                            Your Scores
                        </h3>

                    </div>

                    <div className="mini-container">

                        <h5 className="h5">
                            View your Simulator and Quiz scores.
                        </h5>

                    </div>

                </Link>


                <Link
                    to="/chatbot"
                    className="feature-card"
                >

                    <div className="head-container">

                        <img
                            src={chatbot}
                            alt="Scam Help Assistant"
                            className="card-logo"
                        />

                        <h3 className="h3">
                            Are You Scammed?
                        </h3>

                    </div>

                    <div className="mini-container">

                        <h5 className="h5">
                            Get guidance if you encounter
                            a suspicious online activity.
                        </h5>

                    </div>

                </Link>

            </div>

        </div>
    );
}

export default Home;