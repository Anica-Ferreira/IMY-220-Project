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

//UPDATE USER
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, image, role, about, company, placeholder } = req.body;
    const db = await connectDB();

    //find user
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    //Check if user was found
    if (!user) {
        return res.status(404).json({
            error: true,
            error_message: "User not found."
        });
    }

    const updateData = { name, image, role, about, company, placeholder };

    await db.collection("users").updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );

    const updatedUser = await db.collection("users").findOne({ _id: new ObjectId(id) });

    res.status(200).json({
        message: "User successfully updated.",
        user: updatedUser
    });
}

//FIND USER FRIENDS
const getUserFriends = async (req, res) => {
    const {id} = req.params;
    const db = await connectDB();

    //find user
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    
    //Check if user was found
    if (!user) {
        return res.status(404).json({
            error: true,
            error_message: "User not found."
        });
    }

    //Fetch friend data and format
    let friends = [];
    if(Array.isArray(user.friends) && user.friends.length > 0) {
        friends = await db.collection("users")
            .find({ _id: { $in: user.friends.map(f => new ObjectId(f)) } })
            .project({ _id: 1, username: 1, image: 1, email: 1 })
            .toArray();
    }

    res.status(200).json(friends);
};

//ADD FRIEND
const addFriend = async (req, res) => {
    const {id, friendId} = req.body;
    const db = await connectDB();

    await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { friends: new ObjectId(friendId)}}
    );

    res.status(200).json({ message: "Friend successfully added." });
}

//REMOVE FRIEND
const removeFriend = async (req, res) => {
    const {id, friendId} = req.body;
    const db = await connectDB();

    await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $pull: { friends: new ObjectId(friendId)}}
    );

    res.status(200).json({ message: "Friend successfully removed" });
}

//DELETE USER
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();

    //find user
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    
    //Check if user was found
    if (!user) {
        return res.status(404).json({
            error: true,
            error_message: "User not found."
        });
    }

    //get ids of all projects the user is a part of
    const projects = await db.collection("projects").find({ owner: new ObjectId(id) }).toArray();
    const projectIds = projects.map(p => p._id);

    //delete the projects
    await db.collection("projects").deleteMany({ owner: new ObjectId(id) });

    //remove the deleted project IDs from all users' project arrays
    if (projectIds.length > 0) {
        await db.collection("users").updateMany(
            { projects: { $in: projectIds } },
            { $pull: { projects: { $in: projectIds } } }
        );
    }

    //delete user
    await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ 
        message: "User deleted" 
    });
}

module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    getUserFriends,
    addFriend,
    removeFriend,
    deleteUser
};