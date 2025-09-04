/* Anica Ferreira u24581802 */
import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated }) =>{
    return(
        <header>
            {/* Render a different navbar based on whether the user is logged in */}
            {isAuthenticated ? (
                <nav>
                    <Link to="/home"><h2>CabiNet</h2></Link>
                    <Link to="/home">Home</Link>
                    <Link to="/projects">Projects</Link>
                    {/* hardcoded for now, needs to go to logged in users profile */}
                    <Link to="/profile/u1">Profile</Link> 
                    <Link to="/">Log out</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/"><h2>CabiNet</h2></Link>
                    <Link to="/signup"><button>Sign Up</button></Link>
                    <Link to="/login"><button>Log In</button></Link>
                </nav>
            )}
            
        </header>
    );
};