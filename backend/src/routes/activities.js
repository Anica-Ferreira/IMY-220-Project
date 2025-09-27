/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();
const { 
    getAllActivity, 
    getActivityByID, 
    getActivityByProjectId, 
    getActivityByUserId,
    getFormattedActivities
} = require("../controllers/activityController");

router.get('/formatted', getFormattedActivities);
router.get('/user/:userId', getActivityByUserId);
router.get('/project/:projectId', getActivityByProjectId);
router.get('/:id', getActivityByID);
router.get('/', getAllActivity);

module.exports = router;