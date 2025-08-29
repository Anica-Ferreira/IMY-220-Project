/* Anica Ferreira u24581802 */

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Splash } from "./pages/Splash";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([        
    {
        path: "/",
        element: <Splash />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/profile",
        element: <Profile />
    }
]);

export const App = () => {
    return(
        <RouterProvider router={router} />
    );
};