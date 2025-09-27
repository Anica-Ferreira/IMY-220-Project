/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();
const { 
    getAllUsers,
    getUserByID,
    getUserFriends,
    addFriend,
    updateUser,
    removeFriend
 } = require("../controllers/userController");

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.get('/friends/:id', getUserFriends);

router.put("/update/:id", updateUser);
router.post('/removeFriend', removeFriend);
router.post('/addFriend', addFriend);

module.exports = router;
