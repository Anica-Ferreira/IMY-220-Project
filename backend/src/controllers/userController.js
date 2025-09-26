/* Anica Ferreira 40_u24581802 */

const connectDB = require("../db/connection");
const { ObjectId } = require('mongodb');

/* CRUD OPERATIONS FOR USERS */

//GET ALL USERS
const getAllUsers = async (req, res) => {
    const db = await connectDB();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
}

//GET USER BY ID
const getUserByID = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    //Check if user was found
    if(!user){
        return res.status(404).json({
            error : true,
            error_message : "User not found."
        });
    }

    res.status(200).json(user);
}


module.exports = {
    getAllUsers,
    getUserByID
};