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
                        AntiScam App
                    </h4>

                    <p className="footer-text">
                        Helping users identify, prevent,
                        and report online scams safely.
                    </p>

                </div>


                {/* Quick Links */}
                <div className="footer-section">

                    <h4 className="footer-title">
                        Quick Links
                    </h4>

                    <ul className="footer-links">

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
                                Get Help
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
                        call the Cyber Crime Helpline at{" "}
                        <strong>1930</strong>.
                    </p>


                    <div className="footer-actions">

                        {/* Government Cyber Crime Portal */}
                        <a
                            href="https://www.cybercrime.gov.in/"
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