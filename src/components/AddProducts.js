import React, { useState , useContext} from 'react';
import productContext from '../context/products/productContext';

const AddProducts = (props) => {
    const context = useContext(productContext);
    const { addProducts } = context;
    const [product, setProduct] = useState({ title: "", description: "", tag: "", price: 0 });

    const handleClick = (e) => {
        e.preventDefault();
        addProducts(product.title, product.description, product.tag, product.price);
        console.log(product)
        setProduct({ title: "", description: "", tag: "", price: 0 });
        props.showAlert("Product Added successfully", "success")

    }
    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h1>Add Products</h1>
            <form>
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
                    <input type="text" className="form-control" value={product.price} onChange={onChange} name="price" id="price" minLength={1} required />
                </div>
                <button disabled={product.title.length < 5 || product.description.length < 5 || product.tag.length < 3 || product.price.length < 1} type="submit" onClick={handleClick} className="btn btn-primary">Add product</button>
            </form>
        </div>
    )
}

export default AddProducts;
