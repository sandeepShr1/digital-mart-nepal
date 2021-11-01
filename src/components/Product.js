import React, { useContext } from 'react';
import productContext from '../context/products/productContext';


const Product = (props) => {
    const context = useContext(productContext);
    const { deleteProduct } = context;
    let { product, updateProduct } = props;
    return (

        <tr>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.tag}</td>
            <td>
                <i className="fas fa-edit mx-3" onClick={() => { updateProduct(product) }}></i>
                <i className="fas fa-trash mx -2" onClick={() => { deleteProduct(product._id); props.showAlert("Deleted successfully", "success") }}></i>
            </td>
        </tr>



    );
}

export default Product;
