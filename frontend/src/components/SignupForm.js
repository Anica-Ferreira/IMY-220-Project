/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = ({ setIsAuthenticated }) =>{
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
            "password" : passwordError,
            "signup" : ""
        };
        setErrors(newErrors);

        if(!usernameError && !emailError && !passwordError){
            try{
                const res = await fetch('/auth/signup', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await res.json();
                
                //If user already exists
                if(!res.ok){
                    setErrors({ username: "", email: "", password: "", signup: data.error_message});
                }else{
                    console.log(data);
                    //store ID
                    sessionStorage.setItem("userId", data._id);
                    sessionStorage.setItem("isAuthenticated", "true");
                    setIsAuthenticated(true);
                    //successful sign up - redirect to home
                    navigate("/home");
                }
            }catch (err){
                console.log("Error signing up:", err);
            }   
        }
    };

    return(
        <div className="form-box shadow-sm rounded bg-dark">
            <form onSubmit={submit} noValidate autoComplete="off">
                <h2>Sign Up</h2>
                <div className="form-input">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="usernameInput" placeholder=""/>
                    <label htmlFor="usernameInput">Username</label>
                </div>
                {errors.username && <small className="text-danger">{errors.username}</small>}

                <div className="form-input">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="emailInput"  placeholder=""/>
                    <label htmlFor="emailInput">Email</label>
                </div>
                {errors.email && <small className="text-danger">{errors.email}</small>}
                
                <div className="form-input">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput"  placeholder="" />
                    <label htmlFor="passwordInput">Password</label>
                </div>
                {errors.password && <small className="text-danger">{errors.password}</small>}

                {errors.signup && <small className="text-danger">{errors.signup}</small>}

                <div className="mt-1 form-info">
                    <small>Already a member? <Link to="/login" className="red-link">Login</Link></small>
                </div>
                
                <div>
                    <input type="submit" name="submit" value="Sign Up" className="mt-4"/>
                </div>
            </form>
        </div>
    )
}