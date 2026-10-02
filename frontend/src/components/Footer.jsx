import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="app-footer">

            <div className="footer-container">

                {/* Brand Information */}
                <div className="footer-section">

                    <h4 className="footer-title">
                        AntiScam
                    </h4>

                    <p className="footer-text">
                        An educational awareness project helping users recognize, prevent,
                        and understand online scams and fraud safely.
                    </p>

                </div>


                {/* Quick Links */}
                <div className="footer-section">

                    <h4 className="footer-title">
                        Quick Links
                    </h4>

                    <ul className="footer-links">

                        <li>
                            <Link to="/learn">
                                Learn About Scams
                            </Link>
                        </li>

                        <li>
                            <Link to="/simulation">
                                Scam Simulator
                            </Link>
                        </li>

                        <li>
                            <Link to="/quiz">
                                Scam Quiz
                            </Link>
                        </li>

                        <li>
                            <Link to="/score">
                                Your Scores
                            </Link>
                        </li>

                        <li>
                            <Link to="/chatbot">
                                Scam Help
                            </Link>
                        </li>

                    </ul>

                </div>


                {/* Official Help */}
                <div className="footer-section">

                    <h4 className="footer-title">
                        Official Help
                    </h4>

                    <p className="footer-text">
                        For financial cyber fraud in India,
                        call the National Cyber Crime Helpline:{" "}
                        <strong>1930</strong>.
                    </p>


                    <div className="footer-actions">

                        {/* Government Cyber Crime Portal */}
                        <a
                            href="https://cybercrime.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-btn"
                        >
                            Report Cyber Crime
                        </a>


                        {/* AntiScam Help Assistant */}
                        <Link
                            to="/chatbot"
                            className="footer-btn secondary-btn"
                        >
                            Get Guidance
                        </Link>

                    </div>

                </div>

            </div>


            {/* Bottom Bar */}
            <div className="footer-bottom">

                <p>
                    &copy; {currentYear} AntiScam App.
                    All rights reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;