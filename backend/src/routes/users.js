/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserByID } = require("../controllers/userController");

router.get('/', getAllUsers);
router.get('/:id', getUserByID);

module.exports = router;
