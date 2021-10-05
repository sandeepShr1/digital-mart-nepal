const express = require('express');
const Product = require('../modules/Product')
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route 1 Get all notes using: GET "/api/auth/fetchallproducts". Login required!
router.get('/fetchallproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id })
        res.json(products)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})

// Route 2 Post notes using: POST "/api/auth/addproducts". Login required!
router.post('/addproducts', fetchuser, [
    body('title', 'Enter a valid title!').isLength({ min: 5 }),
    body('description', 'Enter a valid description!').isLength({ min: 5 }),
    body('price', 'Enter a valid price!').isLength({ min: 1 })

], async (req, res) => {
    try {
        const { title, description, tag, price } = req.body
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const products = new Product({
            title, description, price, tag, user: req.user.id
        })
        const saveProduct = await products.save();

        res.json(saveProduct);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong!")
    }
})


module.exports = router;