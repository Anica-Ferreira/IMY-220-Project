/* Anica Ferreira 40_u24581802 */
import React, { useState } from "react";

export const Footer = () =>{
    const [isLight, setIsLight] = useState(false);
    
    const toggleTheme = () => {
        setIsLight(!isLight);
        document.body.classList.toggle("light-theme");
    };

    return(
        <footer className="p-5 w-100 bg-dark bottom-0 shadow-lg">
            <div className="container d-flex justify-content-center">
                <a href=""><i className="fa-brands fa-facebook fa-xl"></i></a>
                <a href=""><i className="fa-brands fa-twitter fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-instagram fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-tiktok fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-youtube fa-xl mx-3"></i></a>    
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <p className="text-center mt-3 w-100">&copy; Cabinet | 2025 | All rights reserved. </p>
                <span onClick={toggleTheme}>
                    <i className={`fas ${isLight ? "fa-sun" : "fa-moon"} fs-4`}></i>
                </span>
            </div>
        </footer>
    );
};