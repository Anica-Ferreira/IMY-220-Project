/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();
const { 
    getAllProjects, 
    getProjectsByID, 
    getProjectsByUserId,
    updatedProject,
    deleteProject,
    addDiscussionMessage,
    addProjectMember,
    removeProjectMember
} = require('../controllers/projectController');

router.get('/', getAllProjects);
router.get('/:id', getProjectsByID);
router.get('/user/:id', getProjectsByUserId);

router.put('/update/:id', updatedProject);
router.put('/add-member/:id', addProjectMember);
router.put('/remove-member/:id', removeProjectMember);

router.delete('/delete/:id', deleteProject);

router.post('/discussion/:id', addDiscussionMessage);

module.exports = router;