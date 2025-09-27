/* Anica Ferreira 40_u24581802 */

const connectDB = require("../db/connection");
const { ObjectId } = require('mongodb');

/* CRUD OPERATIONS FOR PROJECTS */

//GET ALL PROJECTS
const getAllProjects = async (req, res) => {
    const db = await connectDB();
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects);
}

//GET PROJECT BY ID
const getProjectsByID = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();
    
    const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });

    //Check if project was found
    if(!project){
        return res.status(404).json({
            error : true,
            error_message : "Project not found."
        });
    }

    res.status(200).json(project);
}

//GET PROJECTS BY USER ID
const getProjectsByUserId = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();

    const projects = await db.collection("projects").find({
        $or: [
            { owner: new ObjectId(id) },
            { members: new ObjectId(id) }
        ]
    }).toArray();

    res.status(200).json(projects);
};

module.exports = {
    getAllProjects,
    getProjectsByID,
    getProjectsByUserId
}