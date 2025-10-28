/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = ({ setIsAuthenticated }) =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("test@tester.com");
    const [password, setPassword] = useState("test1234");
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
        
        //validate input
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError, login: "" });
            return;
        }

        try{
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();
            
            //If password is incorrect, or user does not exist
            if(!res.ok){
                setErrors({ email: "", password: "", login: data.error_message});
            }else{
                //store ID
                sessionStorage.setItem("userId", data.userId);
                sessionStorage.setItem("isAuthenticated", true);
                
                //check if user is admin
                if(data.roleType === "admin"){
                    sessionStorage.setItem("admin", true);
                }else{
                    sessionStorage.setItem("admin", false);
                }

                setIsAuthenticated(true);
                //successful login - redirect to home
                navigate("/home");
            }

        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="form-box shadow-sm rounded bg-dark">
            <form onSubmit={submit} noValidate autoComplete="off">
                <h2>Log In</h2>
                <div className="form-input">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="emailInput" placeholder=""/>
                    <label htmlFor="emailInput">Email</label>
                </div>
                {errors.email && <small className="text-danger">{errors.email}</small>}

                <div className="form-input">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="passwordInput" placeholder=""/>
                    <label htmlFor="passwordInput">Password</label>
                </div>
                {errors.password && <small className="text-danger">{errors.password}</small>}

                {errors.login && <small className="text-danger">{errors.login}</small>}

                <div>
                    <input type="submit" name="submit" value="Log In" className="mt-5"/>
                </div>

                <div className="mt-4 form-info">
                    <small>Not registered? <Link to="/signup" className="red-link">Sign up</Link></small>
                </div>
            </form>
        </div>
    )
}