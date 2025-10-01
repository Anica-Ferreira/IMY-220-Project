/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();
const { 
    getAllUsers,
    getUserByID,
    getUserFriends,
    addFriend,
    updateUser,
    removeFriend,
    deleteUser
 } = require("../controllers/userController");

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.get('/friends/:id', getUserFriends);

router.put("/update/:id", updateUser);

router.post('/removeFriend', removeFriend);
router.post('/addFriend', addFriend);

router.delete('/delete/:id', deleteUser )


module.exports = router;
