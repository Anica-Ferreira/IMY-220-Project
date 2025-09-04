/* Anica Ferreira u24581802 */
const express = require('express');
const router = express.Router();

//sign in stub
router.post('/login', (req, res) => {
    res.json({
        message: "Logged in in succesfully!",
        data: {
            email: "test@test.com",
            password: "test1234",
        }
    });
});

//sign up stub
router.post('/signup', (req, res) => {
    res.json({
        message: "Signed up succesfully!",
        data: {
            username: "testUser",
            email: "test@test.com",
            password: "test1234",
        }
    });
});

module.exports = router;