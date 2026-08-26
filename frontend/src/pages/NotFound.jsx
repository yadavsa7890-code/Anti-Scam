import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <div className="notfound-page">

            <div className="notfound-container">

                <div className="error-code">
                    404
                </div>

                <h1>Page Not Found</h1>

                <p>
                    The page you are looking for doesn't exist
                    or may have been moved.
                </p>

                <Link
                    to="/"
                    className="home-btn"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>
    );
}

export default NotFound;