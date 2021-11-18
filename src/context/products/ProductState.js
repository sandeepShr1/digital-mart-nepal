import React, { useState } from 'react';
import productContext from './productContext';

const ProductState = (props) => {
    const host = "http://localhost:5000"
    const productInitial = []

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(productInitial);

    const callLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
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
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setProducts(json)
        setLoading(false)
    }

    // add products
    const addProducts = async (formData) => {
        // API call
        const url = `${host}/api/products/addproducts`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token')
            },
            body: formData
            // body: JSON.stringify({ title, description, tag, price})
        });
        const product = await response.json();
        console.log(product)
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
                "auth-token": localStorage.getItem('token')
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
                "auth-token": localStorage.getItem('token')
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