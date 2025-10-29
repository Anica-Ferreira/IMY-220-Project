/* Anica Ferreira 40_u24581802 */
const { json } = require("express");
const connectDB = require("../db/connection");

/* CRUD OPERATIONS FOR AUTHENTICATION */

//LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;

    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });

    //Check if user was found
    if(!user){
        return res.status(404).json({
            error : true,
            error_message : "No account found with this email. Please sign up."
        });
    }

    //Check password match
    if(password != user.password){
        return res.status(401).json({
            error : true,
            error_message : "Incorrect password. Please try again."
        });
    }

    //Login succesful
    return res.status(200).json({
        error : false,
        message: "Logged in successfully", 
        userId: user._id,
        roleType: user.roleType
    });
}

//SIGNUP
const signup = async (req, res) => {
    const {username, email, password, placeholderImages} = req.body;

    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });

    //check if user exists
    if(user){
        return res.status(400).json({
            error : true,
            error_message : "Looks like you already have an account. Please log in."
        });
    }

    //insert new user
    const result = await db.collection('users').insertOne({
        username,
        email,
        password,
        name: "",
        image: "",
        role: "",
        about: "",
        company: "",
        friends: [],
        projects: [],
        savedProjects: [],
        placeholder: true,
        placeholderImages: placeholderImages
    });

    //Signup succesful
    return res.status(200).json({
        error: false,
        message: "Signed in successfully", 
        userId: result.insertedId 
    });
}

module.exports = {
    login, 
    signup
}