/* Anica Ferreira u24581802 */
import React from "react";
import { Header } from "../components/Header";

export const Splash = () =>{
    return(
        <div>
            <Header isAuthenticated={false}/>
            <h1>Cabinet</h1>
            <h2>The smart way to manage your code.</h2>

            <h3>Create.</h3>
            <p>Start new projects, upload files, and bring your ideas to life.</p>

            <h3>Collaborate.</h3>
            <p>Add friends, code together, and stay in sync across your team.</p>

            <h3>Commit.</h3>
            <p>Track changes, leave messages, and update your project history.</p>
            
        </div>
    );
};