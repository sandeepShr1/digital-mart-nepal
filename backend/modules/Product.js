const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    articleImage: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;