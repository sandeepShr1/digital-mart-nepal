import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../container/Spinner';
import Product from './Product';

const Shop = () => {

    const [category, setCategory] = useState('electronics')
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => {
                console.log(res.data)
                const productsData = res.data;
                setProducts(productsData);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })

    }, [category])


    return (
        <div className="my-3 mx-2">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                    {category}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><button className="dropdown-item" type="button" onClick={() => setCategory('electronics')}>electronics</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => setCategory('jewelery')}>jewelry</button></li>
                    <li><button className="dropdown-item" type="button"   >men's clothing</button></li>
                    <li><button className="dropdown-item" type="button" onClick={() => setCategory('Womens clothing')}>women's clothing</button></li>
                </ul>
            </div>
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
        </div >
    )
}

export default Shop;
