/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();
const { 
    getAllProjects, 
    getProjectsByID, 
    getProjectsByUserId 
} = require("../controllers/projectController");

router.get('/', getAllProjects);
router.get('/:id', getProjectsByID);
router.get('/user/:id', getProjectsByUserId);

module.exports = router;