/* Anica Ferreira u24581802 */
import React from "react";
import { Header } from "../components/Header";
import { SignupForm } from "../components/SignupForm";

export const Signup = () =>{
    return(
        <div>
            <Header isAuthenticated={false}/>
            <main>
                <h1>Sign Up</h1>
                <SignupForm />
            </main>          
        </div>
    )
};