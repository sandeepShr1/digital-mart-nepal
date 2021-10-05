import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
    let { title, description, imgUrl, price, category } = props;
    return (
        <>
            <div className="card my-3 shadow p-3 mb-4 bg-white rounded">
                <img src={imgUrl} className="card-img-top" alt="img" />
                <div className="card-body">
                    <h5 className="card-title">{title}..</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><b>Price:</b>${price}</p>
                    <p className="card-text"><b>Category:</b> {category}</p>
                    <Link to="#" className="btn btn-primary">Buy</Link>
                </div>
            </div>
        </>
    );
}

export default Product;
