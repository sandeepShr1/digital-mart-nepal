const express = require('express');
const Product = require('../modules/Product')
const fetchuser = require('../middleware/fetchuser');
const isAdmin = require('../middleware/isAdmin')
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, validationResult } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route 1 Get all products using: GET "/api/auth/fetchallproducts". Login required!
router.get('/fetchallproducts', isAdmin, async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
        return;
    } catch (error) {
        res.status(500).send("Something went wrong!")
    }
})

// Route 2 Post products using: POST "/api/auth/addproducts". Login required!
router.post('/addproducts', isAdmin, upload.single('articleImage'), [
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
            title, description, price, tag, user: req.user.id, articleImage: req.file.filename
        })
        if (req.user.isAdmin) {
            const saveProduct = await products.save();

            res.json(saveProduct);
        }
    }
    catch (error) {
        res.status(500).send("Something went wrong!")
    }
})

// Route 3 UPDATE products using: put "/api/products/updateproduct". Login required
router.put('/updateproduct/:id', isAdmin, async (req, res) => {
    try {
        const { title, description, price, tag } = req.body;
        // const {articleImage} = req.file.filename

        // create a new product object
        const newProduct = {};
        if (title) { newProduct.title = title };
        if (description) { newProduct.description = description };
        if (price) { newProduct.price = price };
        if (tag) { newProduct.tag = tag };
        // if (articleImage) { newProduct.articleImage = articleImage };

        // Find the product that to be updated and update it
        let product = await Product.findById(req.params.id);
        if (!product) { return res.status(404).send("Not found") };

        // if (product.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Permitted!");
        // }
        if (req.user.isAdmin) {
            product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
            res.json({ product });
        }

    } catch (error) {
        res.status(500).send("Something went wrong!")
    }
})

// Route 4 DELETE a product using: DELETE "/api/products/deleteproduct" Login required
router.delete('/deleteproduct/:id', isAdmin, async (req, res) => {
    try {
        // Find the product that to be deleted and delete it
        let product = await Product.findById(req.params.id);
        if (!product) { return res.status(404).send("Not found") };

        if (!req.user.isAdmin) {
            return res.status(401).send("Not Permitted!");
        }
        if (req.user.isAdmin) {
            product = await Product.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Success! Product has been deleted.", "product": product });
        }
    } catch (error) {
        res.status(500).send("Something went wrong!")
    }
})


module.exports = router;