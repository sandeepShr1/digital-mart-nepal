import React, { useState, useContext } from 'react';
import productContext from '../context/products/productContext';

const AddProducts = (props) => {
    const context = useContext(productContext);
    const { addProducts } = context;
    const [product, setProduct] = useState({ title: "", description: "", tag: "", price: 0, articleImage: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', product.title)
        formData.append('description', product.description)
        formData.append('tag', product.tag)
        formData.append('price', product.price)
        formData.append('articleImage', product.articleImage)

        console.log(formData.get("articleImage"))
        addProducts(formData)
        // addProducts(product.title, product.description, product.tag, product.price, product.articleImage);
        console.log(product)
        setProduct({ title: "", description: "", tag: "", price: 0, articleImage: "" });
        props.showAlert("Product Added successfully", "success")

    }

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const handlePhoto = (e) => {
        setProduct({ ...product, articleImage: e.target.files[0] })
    }

    return (
        <div className="container">
            <h1>Add Products</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Add an image</label>
                    <input
                        className="form-control"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="articleImage"
                        onChange={handlePhoto}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={product.title} id="title" name="title" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={product.description} onChange={onChange} name="description" id="description" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" value={product.tag} onChange={onChange} name="tag" id="tag" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" value={product.price} onChange={onChange} name="price" id="price" minLength={1} required />
                </div>
                <button disabled={product.title.length < 5 || product.description.length < 5 || product.tag.length < 3 || product.price.length < 1} type="submit" className="btn btn-primary">Add product</button>
            </form>
        </div>
    )
}

export default AddProducts;
