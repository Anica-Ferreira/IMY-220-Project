/* Anica Ferreira u24581802 */
import React from "react"; 
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

export const Login = () =>{
    return(
        <div>
            <Header isAuthenticated={false}/>
            <h1>Log In</h1>
            <LoginForm />
        </div>
    )
};