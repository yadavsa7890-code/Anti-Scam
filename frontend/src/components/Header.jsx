import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/AntiScam.png";

function Header() {

    return (

        <header className="header">

            <NavLink to="/" className="logo">

                <img
                    src={logo}
                    alt="AntiScam logo"
                />

                <span>AntiScam</span>

            </NavLink>


            <nav className="nav">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Home
                </NavLink>


                <NavLink
                    to="/simulation"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Simulation
                </NavLink>


                <NavLink
                    to="/quiz"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Quiz
                </NavLink>


                <NavLink
                    to="/score"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Score
                </NavLink>


                <NavLink
                    to="/chatbot"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Chatbot
                </NavLink>

                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                  }
                >
                    Login    
                </NavLink>

            </nav>

        </header>

    );
}

export default Header;