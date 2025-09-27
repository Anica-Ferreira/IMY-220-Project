/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Splash } from "./pages/Splash";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { Profile } from "./pages/Profile";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //check session storage on first load
    useEffect(() => {
        const storedUser = sessionStorage.getItem("userId");
        if (storedUser) {
            setIsAuthenticated(true);
        }
    }, []);

    return(
        <BrowserRouter>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <main>
                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<Project />} />
                    <Route path="/profile/:profileId" element={<Profile />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
};