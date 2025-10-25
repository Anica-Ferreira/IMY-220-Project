/* Anica Ferreira 40_u24581802 */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "../components/Search";
import { ProfileImage } from "./ProfileImage";
import { useState, useEffect, useRef } from "react";

export const Header = ({ isAuthenticated, setIsAuthenticated }) =>{
    const navigate = useNavigate();
    const sessionUserId = sessionStorage.getItem("userId");
    const [currentUser, setCurrentUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleAuthChange = () => {
            const storedAuth = sessionStorage.getItem("isAuthenticated") === "true";
            setIsAuthenticated(storedAuth);
        };

        if (sessionUserId) {
            fetchUser();
        }

        window.addEventListener("authChange", handleAuthChange);
        handleAuthChange();

        return () => window.removeEventListener("authChange", handleAuthChange);
    }, [setIsAuthenticated, sessionUserId]);

    const fetchUser = async () => {
        if (!sessionUserId) return;

        try {
            const res = await fetch(`/api/users/${sessionUserId}`);
            const data = await res.json();
            setCurrentUser(data);
        } catch (err) {
            console.error("Error fetching user:", err);
            setCurrentUser(null); 
        }
    };

    const logout = () =>{
        sessionStorage.removeItem("userId");
        sessionStorage.setItem("isAuthenticated", "false");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("authChange"));
        setDropdownOpen(false);
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
                        <li className="btn-white mx-2 btn-md">
                            <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : "" }>
                                Home
                            </NavLink>
                        </li>
                        <li className="btn-white mx-2 btn-md">
                            <NavLink to="/projects" className={({ isActive }) => isActive ? "active-link" : "" }>
                                Projects
                            </NavLink>
                        </li>

                        {/* Profile dropdown */}
                        <li className="position-relative" ref={dropdownRef}>
                            <button className="btn-white mx-2 btn-md border-0 bg-transparent" onClick={() => setDropdownOpen((prev) => !prev)}>
                                {currentUser && <ProfileImage profile={currentUser} onClick={() => setDropdownOpen((prev) => !prev)} />}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu show position-absolute end-0 mt-2 p-2 bg-light rounded shadow">
                                    <NavLink to={`/profile/${sessionUserId}`} className="dropdown-item text-dark d-block py-1 px-2" onClick={() => setDropdownOpen(false)}>
                                        <i className="fa-solid fa-user me-2"></i> View Profile
                                    </NavLink>
                                    <button onClick={logout} className="dropdown-item text-danger d-block py-1 px-2 border-0 bg-transparent w-100 text-start">
                                        <i className="fa-solid fa-right-from-bracket me-2"></i> Log Out
                                    </button>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav className="navbar">
                    <NavLink to="/" className="navbar-brand mx-2"><img src="/assets/images/logo.png" className="logo" alt="CabiNet logo"/></NavLink>
                    <div className="ms-auto">
                        <NavLink to="/signup">
                            <button className="btn-white mx-3 btn-md">
                                Sign Up
                            </button>
                        </NavLink>
                        <NavLink to="/login">
                            <button className="btn-red mx-3 btn-md">
                                Log In
                            </button>
                        </NavLink>
                    </div>             
                </nav>
            )}
        </header>
    );
};