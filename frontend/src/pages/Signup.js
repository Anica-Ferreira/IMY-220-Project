/* Anica Ferreira 40_u24581802 */
import React from "react";
import { SignupForm } from "../components/SignupForm";

export const Signup = ({setIsAuthenticated}) =>{
    return(
        <SignupForm setIsAuthenticated={setIsAuthenticated}/>        
    )
};