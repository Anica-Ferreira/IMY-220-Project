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
            { members: { $in: [new ObjectId(id)] } }
        ]
    }).toArray();

    res.status(200).json(projects);
};

//UPDATE PROJECT
const updatedProject = async (req, res) => {
    const { id } = req.params;
    const { name, image, type, description, owner } = req.body;
    const db = await connectDB();

    //find project
    const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });

    //Check if project was found
    if(!project){
        return res.status(404).json({
            error : true,
            error_message : "Project not found."
        });
    }

    //add to update body only if provided
    const updateData = {};
    if(name !== undefined) updateData.name = name;
    if(image !== undefined) updateData.image = image;
    if(type !== undefined) updateData.type = type;
    if(description !== undefined) updateData.description = description;
    if (owner !== undefined) updateData.owner = new ObjectId(owner);

    await db.collection("projects").updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );

    const updatedProject = await db.collection("projects").findOne({ _id: new ObjectId(id) });

    res.status(200).json({
        message: "Project successfully updated.",
        project: updatedProject
    });
}

//DELETE PROJECT
const deleteProject = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();

    //find project
    const project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
    
    //Check if project was found
    if (!project) {
        return res.status(404).json({
            error: true,
            error_message: "Project not found."
        });
    }

    //delete activity
    await db.collection("activity").deleteMany({ projectId: new ObjectId(id) });

    //delete members from projects
    await db.collection("users").updateMany(
        { projects: new ObjectId(id) },
        { $pull: { projects: new ObjectId(id) } }
    );

    //delete project
    await db.collection("projects").deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ 
        message: "Project deleted" 
    });
}

//INSERT DISCUSSION MESSAGE
const addDiscussionMessage = async (req, res) => {
    const { id } = req.params;
    const { userId, message } = req.body;
    const db = await connectDB();
    
    //find project
    const project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
    
    //Check if project was found
    if (!project) {
        return res.status(404).json({
            error: true,
            error_message: "Project not found."
        });
    }

    //new message
    const discussionMessage = {
        userId: new ObjectId(userId),
        message,
        timestamp: new Date()
    };

    await db.collection("projects").updateOne(
        { _id: new ObjectId(id) },
        { $push: { discussion: discussionMessage } }
    );

    res.status(200).json({
        message: "Discussion message added successfully.",
        discussionMessage
    });
}

//ADD PROJECT MEMBER
const addProjectMember = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const db = await connectDB();

    //find project
    const project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
    
    //Check if project was found
    if (!project) {
        return res.status(404).json({
            error: true,
            error_message: "Project not found."
        });
    }

    //find user
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) return res.status(404).json({ 
        error: true, 
        error_message: "User not found." 
    });

    //add user to project members
    await db.collection('projects').updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { members: user._id } }
    );

    //add project to user's projects array
    await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { projects: project._id } }
    );

    res.status(200).json({ message: "Member added successfully." });
}

//REMOVE PROJECT MEMBER
const removeProjectMember = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const db = await connectDB();

    //find project
    const project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
    
    //Check if project was found
    if (!project) {
        return res.status(404).json({
            error: true,
            error_message: "Project not found."
        });
    }

    //find user
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) return res.status(404).json({ 
        error: true, 
        error_message: "User not found." 
    });

    //remove user to project members
    await db.collection('projects').updateOne(
        { _id: new ObjectId(id) },
        { $pull: { members: user._id } }
    );

    //remove project to user's projects array
    await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { projects: project._id } }
    );

    res.status(200).json({ message: "Member removed successfully." });
}

module.exports = {
    getAllProjects,
    getProjectsByID,
    getProjectsByUserId,
    updatedProject,
    deleteProject,
    addDiscussionMessage,
    addProjectMember,
    removeProjectMember
}