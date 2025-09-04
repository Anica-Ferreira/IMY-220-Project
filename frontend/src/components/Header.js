/* Anica Ferreira u24581802 */
import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated }) =>{
    return(
        <header>
            {/* Render a different navbar based on whether the user is logged in */}
            {isAuthenticated ? (
                <nav className="navbar">
                    <div className="logo">
                        <Link to="/home"><h4 id="logo">CabiNet</h4></Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/home">Home</Link>
                        <Link to="/projects">Projects</Link>
                        {/* hardcoded for now, needs to go to logged in users profile */}
                        <Link to="/profile/u1">Profile</Link>
                        <Link to="/">Log out</Link>
                    </div>
                </nav>
            ) : (
                <nav className="navbar">
                    <div className="logo">
                        <Link to="/"><h4 id="logo">CabiNet</h4></Link>
                    </div>
                    <div className="nav-links">
                        <Link to="/signup"><button>Sign Up</button></Link>
                        <Link to="/login"><button>Log In</button></Link>
                    </div>
                </nav>
            )}
            
        </header>
    );
};