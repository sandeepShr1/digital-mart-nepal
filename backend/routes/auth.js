const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../modules/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
require('dotenv').config()

const JWT_SECRET = "Mart@1999"

//Router 1 to create user using: POST "/api/auth/createuser" . Doesn't required auth
router.post('/createuser', [
    body('password', 'Password must be at least 6!').isLength({ min: 5 }),
    body('email', 'Enter a valid email!').isEmail(),
    body('name', 'Enter valid name!').isLength({ min: 5 })

], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether user exist already!
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exist!" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // creating user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json(authToken)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})

// Route 2 Login using : POST "/api/auth/login". Does not require auth
router.post('/login', [
    body('password', 'Password must be at least 6!').isLength({ min: 5 }),
    body('email', 'Enter a valid email!').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Enter valid email" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Enter valid email/password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json(authToken);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!");
    }
})

// Route 3 Fetch all user's details: GET: "/api/auth/getuser" . Login required.
router.get('/getuser', fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!");
    }
})

module.exports = router;