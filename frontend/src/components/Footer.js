/* Anica Ferreira 40_u24581802 */
import React from "react";

export const Footer = () =>{
    return(
        <footer className="p-5 w-100 bg-dark bottom-0 shadow-lg">
            <div className="container d-flex justify-content-center">
                <a href=""><i className="fa-brands fa-facebook fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-twitter fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-instagram fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-tiktok fa-xl mx-3"></i></a>
                <a href=""><i className="fa-brands fa-youtube fa-xl mx-3"></i></a>    
            </div>
            <div>
                <p className="text-center mt-3 w-100">&copy; 2025 Cabinet | 2025 | All rights reserved. </p>
            </div>
        </footer>
    );
};