/* Anica Ferreira 40_u24581802 */

const connectDB = require("../db/connection");
const { ObjectId } = require('mongodb');

/* CRUD OPERATIONS FOR ACTIVITY */

//GET ALL ACTIVITY
const getAllActivity = async (req, res) => {
    const db = await connectDB();
    const activity = await db.collection('activity').find({}).toArray();
    res.json(activity);
}

//GET ACTIVITY BY ID
const getActivityByID = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();
    
    const activity = await db.collection('activity').findOne({ _id: new ObjectId(id) });

    //Check if activity was found
    if(!activity){
        return res.status(404).json({
            error : true,
            error_message : "Activity not found."
        });
    }

    res.status(200).json(activity);
}

//GET ACTIVITY BY USER ID
const getActivityByUserId = async (req, res) => {
    const { userId } = req.params;
    const db = await connectDB();

    const activities = await db.collection('activity').aggregate([
        // only fetch activities for this user
        {$match: {userId: new ObjectId(userId) } },
        {$lookup: { 
            from: "users", 
            localField: "userId", 
            foreignField: "_id", 
            as: "user" 
        }},
        {$unwind: "$user" },
        {$lookup: { 
            from: "projects", 
            localField: "projectId", 
            foreignField: "_id", 
            as: "project" 
        }},
        {$unwind: "$project" },
        {$project: {
            _id: 1,
            action: 1,
            date: 1,
            message: 1,
            timestamp: 1,
            userId: "$user._id",
            username: "$user.username",
            userImage: "$user.image",
            projectId: "$project._id",
            projectName: "$project.name",
            projectImage: "$project.image",
            projectDescription: "$project.description",
            projectLanguages: "$project.languages",
        }},
        {$sort: { date: -1 }}
    ]).toArray();

    res.status(200).json(activities);
};

//GET ACTIVITY BY PROJECT ID
const getActivityByProjectId = async (req, res) => {
    const { projectId } = req.params;
    const db = await connectDB();

    const activity = await db.collection('activity')
        .find({ projectId: new ObjectId(projectId) })
        .toArray();

    res.json(activity);
};

//GET FORMATTED ACTIVITIES
const getFormattedActivities = async (req, res) => {
    const db = await connectDB();

    const activities = await db.collection('activity').aggregate([
        { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user"}},
        { $unwind: "$user" },
        { $lookup: { from: "projects", localField: "projectId", foreignField: "_id", as: "project" }},
        { $unwind: "$project" },
        {
            $project: {
                _id: 1,
                action: 1,
                date: 1,
                message: 1,
                timestamp: 1,
                userId: "$user._id",
                username: "$user.username",
                userImage: "$user.image",
                projectId: "$project._id",
                projectName: "$project.name",
                projectImage: "$project.image",
                projectDescription: "$project.description",
                projectLanguages: "$project.languages",
                downloads: "$project.downloads"
            }
        },
        //sort in reverse chronological order
        { $sort: { date: -1 } }
    ]).toArray();

    res.status(200).json(activities);
};

module.exports = {
    getAllActivity,
    getActivityByID,
    getActivityByProjectId,
    getActivityByUserId,
    getFormattedActivities
}