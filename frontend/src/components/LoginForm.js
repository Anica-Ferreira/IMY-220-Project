/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    
    const validateEmail = (email) =>{
        if(!email) return "Please enter your email.";
        return "";
    };

    const validatePassword = (password) =>{
        if(!password) return "Please enter your password.";
        return "";
    }

    const submit = async (event) =>{
        event.preventDefault();
        
        //get input errors
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        let loginErorr = "";
        if(email != "test@test.com" || password != "test1234"){
            loginErorr = "Invalid email or password. Please try again.";
        }
        
        //object to store all input errors
        const newErrors = {
            "email" : emailError,
            "password" : passwordError,
            "login" : loginErorr
        };
        setErrors(newErrors);

        //successful login - redirect to home
        if(loginErorr == "" && emailError == "" && passwordError == ""){
            try{
                const res = await fetch('/auth/login', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email, password})
                });
                const data = await res.json();
                console.log(data);
                //successful login - redirect to home
                navigate("/home");
            }catch (err){
                console.log("Error logging in: ", err);
            }
        }
    }

    return(
        <form onSubmit={submit} noValidate>
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

            {errors.login && <small style={{ color: "red" }}>{errors.login}</small>}<br/>

            <small>Not registered? <Link to="/signup">Sign up</Link></small>

            <div>
                <input type="submit" name="submit" value="Log In"/>
            </div>
        </form>
    )
}