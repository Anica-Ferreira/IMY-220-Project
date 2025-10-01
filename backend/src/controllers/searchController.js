/* Anica Ferreira 40_u24581802 */

const connectDB = require("../db/connection");
const { ObjectId } = require('mongodb');


//SEARCH FOR USERS, ACTIVITIES, AND PROJECTS
const search = async (req, res) => {
    const db = await connectDB();
    const { q, hashtag } = req.query;

    //if searching by hashtag, only search for projects
    if(hashtag) {
        const projects = await db.collection("projects")
            .find({ languages: { $regex: new RegExp(`^${hashtag}$`, "i")}})
            .toArray();

        return res.status(200).json({
            users: [],
            projects,
            activities: []
        });
    }   

    //GLOBAL SEARCH

    //case insensitve and partial match
    const searchQuery = new RegExp(q, "i");

    //USERS
    const users = await db.collection("users").find({
        $or: [
            { username: searchQuery },
            { name: searchQuery },
            { email: searchQuery }
        ]
    }).toArray();

    //PROJECTS
    const projects = await db.collection("projects").find({
        $or: [
            { name: searchQuery },
            { description: searchQuery },
            { languages: searchQuery }
        ]
     }).toArray();

    //ACTIVITIES
    const activities = await db.collection("activity").find({
        $or: [
            { action: searchQuery },
            { message: searchQuery }
        ]
    }).toArray();

    return res.status(200).json({ 
        users, 
        projects, 
        activities
    });
}

module.exports = {
    search
}