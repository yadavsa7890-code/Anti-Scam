import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Simulation from "./pages/Simulation";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

function PageTitleHandler() {
    const location = useLocation();

    useEffect(() => {
        const titles = {
            "/": "AntiScam — Phishing & Fraud Awareness",
            "/learn": "Learn About Scams | AntiScam",
            "/simulation": "Scam Simulator | AntiScam",
            "/quiz": "Scam Quiz | AntiScam",
            "/score": "Your Scores | AntiScam",
            "/chatbot": "Scam Help | AntiScam"
        };

        document.title = titles[location.pathname] || "AntiScam — Phishing & Fraud Awareness";
    }, [location]);

    return null;
}

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <PageTitleHandler />

                <Header />

                <main className="main-content">
                    <Routes>

                        <Route path="/" element={<Home />} />

                        <Route
                            path="/learn"
                            element={<Learn />}
                        />

                        <Route
                            path="/simulation"
                            element={<Simulation />}
                        />

                        <Route
                            path="/quiz"
                            element={<Quiz />}
                        />

                        <Route
                            path="/score"
                            element={<Score />}
                        />

                        <Route
                            path="/chatbot"
                            element={<Chatbot />}
                        />

                        <Route 
                            path="*" 
                            element={<NotFound />} 
                        />

                    </Routes>
                </main>

                <Footer />

            </div>
        </BrowserRouter>
    );
}

export default App;