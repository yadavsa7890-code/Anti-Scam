import { useState } from "react";
import "./Login.css";

function Login() {

    const codeStreams = Array.from({ length: 51 });
    const [message, setMessage] = useState("");

    function handleLogin(event) {
        event.preventDefault();
        setMessage("Demo login submitted successfully.");
    }

    return (
        <div className="login-page">

            {/* Falling binary code */}
            <div className="code-rain">

                {codeStreams.map((_, index) => (
                    <span key={index}>
                        01<br />
                        10<br />
                        11<br />
                        00<br />
                        10<br />
                        01<br />
                        11<br />
                        10
                    </span>
                ))}

            </div>

            <div className="blue-light"></div>

            <div className="login-box">
                <h1>ACCESS</h1>

                <p className="login-subtitle">
                    Operator Login
                </p>

                <form onSubmit={handleLogin}>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                    />

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                    />

                    <button type="submit">
                        LOGIN
                    </button>

                    {message && (
                        <p className="login-message">
                            {message}
                            </p>
                        )}
                </form>
            </div>
        </div>
    );
}

export default Login;