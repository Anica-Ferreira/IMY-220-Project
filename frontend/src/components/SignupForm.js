/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateEmail = (email) =>{
        if(!email) return "Email cannot be empty.";
        const re = /^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/;
        if(!re.test(email)) return "Invalid email address.";
        return "";
    };

    const validatePassword = (password) =>{
        if(!password) return "Password cannot be empty.";
        if(!/^.{8,}$/.test(password)) return "Password must be longer than 8 characters.";
        if(!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
        if(!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
        if(!/[0-9]/.test(password)) return "Password must contain at least one digit.";
        if(!/[!@#$%^&*()\-_=+\\|[\]{};:/?.]/.test(password)) return "Password must contain at least one special character.";
        return "";
    }

    const validateUsername = (username) =>{
        if(!username) return "Username cannot be empty.";
        return "";
    }

    const submit = async (event) =>{
        event.preventDefault();
        
        //get input errors
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        //object to store all input errors
        const newErrors = {
            "username" : usernameError,
            "email" : emailError,
            "password" : passwordError
        };

        setErrors(newErrors);

        if(usernameError == "" && emailError == "" && passwordError == ""){
            try{
                const res = await fetch('/auth/signup', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await res.json();
                console.log(data);
                //successful sign up - redirect to home
                navigate("/home");
            }catch (err){
                console.log("Error signing up:", err);
            }   
        }
    };

    return(
        <form onSubmit={submit} noValidate>
            <div>
                <label htmlFor="usernameInput">Username</label><br/>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="usernameInput"/>
                {errors.username && <small style={{ color: "red" }}>{errors.username}</small>}
            </div>

            <div>
                <label htmlFor="emailInput">Email</label><br/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="emailInput"/>
                {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
            </div>
            
            <div>
                <label htmlFor="passwordInput">Password</label><br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput"/>
                {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
            </div>

            <small>Already a member? <Link to="/login">Login</Link></small>

            <div>
                <input type="submit" name="submit" value="Sign Up"/>
            </div>
        </form>
    )
}