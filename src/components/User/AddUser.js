import React, { useState, useContext } from 'react';
import productContext from '../../context/products/productContext';

const AddUser = (props) => {
    const context = useContext(productContext);
    const { addUsers } = context;
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addUsers(user.name, user.email, user.password);
        console.log(user)
        setUser({ name: "", email: "", password: "" });
        props.showAlert("User added successfully", "success")

    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className="col main pt-5 mt-3 container">                                                                                          
            <h1>Add Users</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={user.name} id="name" name="name" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={user.email} onChange={onChange} name="email" id="email" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={user.password} onChange={onChange} name="password" id="password" minLength={5} required />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input type="boolean" className="form-control" value={user.isAdmin} onChange={onChange} name="isAdmin" id="isAdmin" required />
                </div> */}
                <button disabled={user.name.length < 5 || user.email.length < 5 || user.password.length < 8} type="submit" className="btn btn-primary">Add user</button>
            </form>
        </div>
    )
}

export default AddUser;
