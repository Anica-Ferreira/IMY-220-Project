/* Anica Ferreira 40_u24581802 */
import React from "react"; 
import { LoginForm } from "../components/LoginForm";

export const Login = ({ setIsAuthenticated }) =>{
    return(
        <LoginForm setIsAuthenticated={setIsAuthenticated}/>
    )
};