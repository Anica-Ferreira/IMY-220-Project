/* Anica Ferreira u24581802 */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Splash } from "./pages/Splash";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { Profile } from "./pages/Profile";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([        
    {path: "/", element: <Splash />},
    {path: "/signup", element: <Signup />},
    {path: "/login", element: <Login />},
    {path: "/home",element: <Home />},
    {path: "/projects", element: <Projects />},
    {path: "/projects/:projectId", element: <Project /> },
    {path: "/profile/:profileId", element: <Profile />}
]);

export const App = () => {
    return(
        <div>
            <RouterProvider router={router} />
            <Footer/>
        </div>
    );
};