const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../modules/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const isAdmin = require('../middleware/isAdmin');
require('dotenv').config()

const JWT_SECRET = "Mart@1999";

//Router 1 to create user using: POST "/api/auth/createuser" . Doesn't required auth
router.post('/createuser', [
    body('password', 'Password must be at least 6!').isLength({ min: 5 }),
    body('email', 'Enter a valid email!').isEmail(),
    body('name', 'Enter valid name!').isLength({ min: 5 })

], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Check whether user exist already!
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User already exist!" });
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // creating user

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            isAdmin: req.body.isAdmin
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})


//Router 2 to add user using: POST "/api/auth/adduser" . required auth
router.post('/adduser', fetchuser, async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Check whether user exist already!
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "User already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // creating user
        const users = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            isAdmin: req.body.isAdmin
        })
        if (req.user.isAdmin) {
            const saveUser = await users.save();

            res.json(saveUser);
        }
        else {
            console.log("not a admin")
        }
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
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Enter valid email" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ success, error: "Enter valid email/password" })
        }

        const data = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin
            }
        }
        if (data.user.isAdmin === true) {
            console.log(data.user.isAdmin)
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            let isAdmin = true
            res.json({ success, authToken, isAdmin });

        } else {
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true
            let isAdmin = false
            res.json({ success, authToken, isAdmin });
        }

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

// Route 4 Get all users using: GET "/api/auth/fetchallusers". Login required!
router.get('/fetchallusers', fetchuser, async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(500).send("You are permitted!");
    }
    try {
        const users = await User.find({}).select("-password")
        res.json(users)
        return

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})

// Route 5 DELETE a user using: DELETE "/api/auth/deleteuser" Login required
router.delete('/deleteuser/:id', fetchuser, async (req, res) => {
    try {
        // Find the product that to be deleted and delete it
        let user = await User.findById(req.params.id);
        if (!user) { return res.status(404).send("User Not found") };

        if (req.user.isAdmin) {
            user = await User.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Success! User has been deleted.", "User": user });
        } else {
            return res.status(401).send("Not Permitted!");
        }
    } catch (error) {
        res.status(500).send("Something went wrong!")
    }
})


// Route 5 Update a user using: UPDATE "/api/auth/edituser" Login required
router.put('/edituser/:id', fetchuser, async (req, res) => {
    try {
        const { name, email, isAdmin } = req.body;
        // const {articleImage} = req.file.filename

        // create a new product object
        const newUser = {};
        if (name) { newUser.name = name };
        if (email) { newUser.email = email };
        if (isAdmin) { newUser.isAdmin = isAdmin };
        console.log(isAdmin)
        // if (articleImage) { newProduct.articleImage = articleImage };

        // Find the product that to be updated and update it
        let user = await User.findById(req.params.id);
        if (!user) { return res.status(404).send("Not found") };

        // if (product.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Permitted!");
        // }
        if (req.user.isAdmin === true) {
            user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true })
            res.json({ user });
            console.log(user)
        }

    } catch (error) {
        return res.status(500).send("Something went wrong!")
    }
})


module.exports = router;