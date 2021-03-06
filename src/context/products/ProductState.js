import React, { useState } from 'react';
import productContext from './productContext';

const ProductState = (props) => {
    const host = "http://localhost:5000"
    const productInitial = []
    const UserInitial = []

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(productInitial);
    const [users, setUsers] = useState(UserInitial);

    const callLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    // Add user
    const addUsers = async (name, email, password) => {
        const url = `${host}/api/auth/adduser`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, password })
        });
        const user = await response.json();
        console.log(user)
        setUsers(users.concat(user));
        callLoading();
    }

    // Fetch all users
    const getAllUsers = async () => {
        setLoading(true)
        // API call
        const url = `${host}/api/auth/fetchallusers`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUsers(json)
        setLoading(false);

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
    // delete user
    const deleteUser = async (id) => {
        // API call
        const url = `${host}/api/auth/deleteuser/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        const newUsers = users.filter((user) => { return user._id !== id });
        setProducts(newUsers);
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


    // update User
    const editUser = async (id, name, email, isAdmin) => {
        // API call
        const url = `${host}/api/auth/edituser/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, isAdmin })
        });
        const json = await response.json();
        console.log(json)

        let newUser = JSON.parse(JSON.stringify(users))
        // Logic
        for (let index = 0; index < newUser.length; index++) {
            const element = newUser[index];
            if (element._id === id) {
                newUser[index].name = name;
                newUser[index].email = email;
                newUser[index].isAdmin = isAdmin;
                break;
            }
        }
        setProducts(newUser);
        callLoading();
    }


    return (
        <productContext.Provider value={{ products, users, deleteUser, editUser, getAllProducts, getAllUsers, addProducts, deleteProduct, editProduct, addUsers, loading }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState;