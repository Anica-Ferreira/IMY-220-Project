/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "../components/Search";

export const Header = ({ isAuthenticated, setIsAuthenticated }) =>{
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            const storedAuth = sessionStorage.getItem("isAuthenticated") === "true";
            setIsAuthenticated(storedAuth);
        };

        window.addEventListener("authChange", handleAuthChange);
        handleAuthChange();

        return () => window.removeEventListener("authChange", handleAuthChange);
    }, [setIsAuthenticated]);

    const logout = () =>{
        sessionStorage.removeItem("userId");
        sessionStorage.setItem("isAuthenticated", "false");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
    }

    return(
        <header className="p-2 w-100vw bg-dark">
            {/* Render a different navbar based on whether the user is logged in */}
            {isAuthenticated ? (
                <nav className="navbar">
                    <NavLink to="/home" className="navbar-brand mx-2"><img src="/assets/images/logo.png" className="logo" alt="CabiNet logo"/></NavLink>
                    <ul className="nav-links d-flex align-items-center list-unstyled mb-0">
                        <li><Search/></li>
                        <li className="btn-white mx-2 mt-2 btn-md">
                            <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : "" }>
                                Home
                            </NavLink></li>
                        <li className="btn-white mx-2 mt-2 btn-md">
                            <NavLink to="/projects" className={({ isActive }) => isActive ? "active-link" : "" }>
                                Projects
                            </NavLink></li>
                        <li className="btn-white mx-2 mt-2 btn-md">
                            <NavLink to={`/profile/${sessionStorage.getItem("userId")}`} className={({ isActive }) => isActive ? "active-link" : "" }>
                                Profile
                            </NavLink></li>
                        <li>
                            <button className="btn-red mx-3 mt-2 btn-md" onClick={logout}>
                                Log out
                            </button>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="navbar">
                    <NavLink to="/" className="navbar-brand mx-2"><img src="/assets/images/logo.png" className="logo" alt="CabiNet logo"/></NavLink>
                    <div className="ms-auto">
                        <NavLink to="/signup">
                            <button className="btn-white mx-3 mt-2 btn-md">
                                Sign Up
                            </button>
                        </NavLink>
                        <NavLink to="/login">
                            <button className="btn-red mx-3 mt-2 btn-md">
                                Log In
                            </button>
                        </NavLink>
                    </div>             
                </nav>
            )}
        </header>
    );
};