import React, { useContext } from 'react';
import productContext from '../context/products/productContext';


const Product = (props) => {
    const context = useContext(productContext);
    const { deleteProduct } = context;
    let { product, updateProduct } = props;
    return (
        <>
            <div className="card" >
                <img src={`../../../images/${product.articleImage}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><b>Price: </b>${product.price}</p>
                    <p className="card-text"><b>Category: </b> {product.tag}</p>
                    <i className="fas fa-trash mx -2" onClick={() => { deleteProduct(product._id); props.showAlert("Deleted successfully", "success") }}></i>
                    <i className="fas fa-edit mx-3" onClick={() => { updateProduct(product) }}></i>
                </div>
            </div>

        </>
    );
}

export default Product;
