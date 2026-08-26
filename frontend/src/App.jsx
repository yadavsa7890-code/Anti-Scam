import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <div className="app">

                <Header />

                <main className="main-content">
                    <Routes>

                        <Route path="/" element={<Home />} />

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
                            path="/login" 
                            element={<Login />} 
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