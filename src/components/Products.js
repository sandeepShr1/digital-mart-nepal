import React, { useState, useEffect } from 'react';
import Spinner from '../container/Spinner';
import Product from './Product';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('https://fakestoreapi.com/products?limit=8?')
            .then(res => {
                const productsData = res.data;
                setProducts(productsData);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className="container my-3">
            <h3 className="text-center">Products</h3>
            {loading && <Spinner />}
            <div className="row ">
                {!loading && products.map((element) => {
                    return <div className="col-md-4" key={element.id}>
                        <Product title={element.title ? element.title.slice(0, 35) : ""}
                            description={element.description ? element.description.slice(0, 80) : ""}
                            imgUrl={element.image ? element.image : ""}
                            price={element.price ? element.price : null}
                            category={element.category ? element.category : null} />
                    </div>
                })}

            </div>
        </div>
    )
}


export default Products;
