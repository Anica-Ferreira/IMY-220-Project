/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useEffect } from "react";
import { Link} from "react-router-dom";

export const Splash = () =>{
    
    useEffect(() => {
        //select all elements
        const hexRows = document.querySelectorAll(".hex-row");

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            hexRows.forEach((row) => {
                const rowTop = row.getBoundingClientRect().top + scrollY;
                if(scrollY + viewportHeight * 0.8 > rowTop) {
                    row.classList.add("show");
                }
            });
        };

        //run function each time a user scrolls
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <div>
            <div className="vh-100 splash">
                <div className="splash-content">
                    <img src="/assets/images/logo.png" className="splashImg" alt="CabiNet logo"/>
                    <h2 className="text-white fs-3">CREATE. COLLABORATE. COMMIT.</h2>
                </div>
            </div>
            <div className="hex-section">
                <div className="hex-row left">
                    <div className="hex">
                        <span>1</span>
                    </div>
                    <div className="hex-text">
                        <h3>Create</h3>
                        <p>Start new projects, upload files, and bring your ideas to life.</p>
                    </div>
                </div>

                <div className="hex-row right">
                    <div className="hex">
                        <span>2</span>
                    </div>
                    <div className="hex-text">
                        <h3>Collaborate</h3>
                        <p>Add friends, code together, and stay in sync across your team.</p>
                    </div>
                    
                </div>

                <div className="hex-row left">
                    <div className="hex">
                        <span>3</span>
                    </div>
                    <div className="hex-text">
                        <h3>Commit</h3>
                        <p>Track changes, leave messages, and update your project history.</p>
                    </div>
                </div>
                <div className="cta-section">
                    <h2>Join CabiNet today!</h2>
                    <p><Link to="/signup" className="red-link">Sign up</Link> to join the community of creators and collaborators. Already a member? <Link to="/login">Login</Link></p>
                    <div className="cta-buttons">
                        <Link to="/signup" className="btn-red">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};