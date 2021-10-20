import React, { useState } from 'react';
import productContext from './productContext';

const ProductState = (props) => {
    const host = "http://localhost:5000"
    const productInitial = []

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(productInitial);

    const callLoading =() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    // Fetch all products
    const getAllProducts = async () => {
        setLoading(true)
        // API call
        const url = `${host}/api/products/fetchallproducts`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzA2YzlmOTJjMmNlODQ1OTI1ZGQyIn0sImlhdCI6MTYzNDU0NzgzNn0.953uRQZ8WgSuU2PvBPPW5H0gyRIEB-9lJ_3IQgRoXH0'
            },
        });
        const json = await response.json();
        setProducts(json)
        setLoading(false)
    }

    // add products
    const addProducts = async (title, description, tag, price) => {
        // API call
        const url = `${host}/api/products/addproducts`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzA2YzlmOTJjMmNlODQ1OTI1ZGQyIn0sImlhdCI6MTYzNDU0NzgzNn0.953uRQZ8WgSuU2PvBPPW5H0gyRIEB-9lJ_3IQgRoXH0'
            },
            body: JSON.stringify({ title, description, tag, price })
        });
        const product = await response.json();
        setProducts(products.concat(product));
        callLoading();
    }
    // delete product
    const deleteProduct = async (id) => {
        // API call
        const url = `${host}/api/products/deleteproduct/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzA2YzlmOTJjMmNlODQ1OTI1ZGQyIn0sImlhdCI6MTYzNDU0NzgzNn0.953uRQZ8WgSuU2PvBPPW5H0gyRIEB-9lJ_3IQgRoXH0'
            },
        });
        const json = await response.json();
        console.log(json)
        const newProducts = products.filter((product) => { return product._id !== id })
        setProducts(newProducts);
        callLoading();
    }

    // update product
    const editProduct = async (id, title, description, tag, price) => {
        // API call
        const url = `${host}/api/products/updateproduct/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1YzA2YzlmOTJjMmNlODQ1OTI1ZGQyIn0sImlhdCI6MTYzNDU0NzgzNn0.953uRQZ8WgSuU2PvBPPW5H0gyRIEB-9lJ_3IQgRoXH0'
            },
            body: JSON.stringify({ title, description, tag, price })
        });
        const json = await response.json();
        console.log(json)

        let newProducts = JSON.parse(JSON.stringify(products))
        // Logic
        for (let index = 0; index < newProducts.length; index++) {
            const element = newProducts[index];
            if (element._id === id) {
                newProducts[index].title = title;
                newProducts[index].description = description;
                newProducts[index].tag = tag;
                newProducts[index].price = price;
                break;
            }
        }
        setProducts(newProducts);
        callLoading();
    }

    return (
        <productContext.Provider value={{ products, getAllProducts, addProducts, deleteProduct, editProduct, loading }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;