import React, { useEffect, useContext, useState, useRef } from 'react';
import Spinner from '../../container/Spinner';
import productContext from '../../context/products/productContext';
import AddUser from './AddUser'
import User from './User';
import { useHistory } from 'react-router-dom';

const Users = (props) => {
    const context = useContext(productContext);
    const { users, getAllUsers, editUser, loading } = context;
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllUsers();
        }
        else {
            props.showAlert("Please login first", "warning")
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [user, setUser] = useState({ name: "", email: "", isAdmin: null });

    const updateUser = (currentUser) => {
        ref.current.click();
        console.log(currentUser)
        setUser({ id: currentUser._id, ename: currentUser.name, eemail: currentUser.email, eisAdmin: currentUser.isAdmin })
        console.log(user)
    }
    const handleClick = () => {
        console.log("Updating the user...", user);
        editUser(user.id, user.ename, user.eemail, user.eisAdmin);
        refClose.current.click();

        props.showAlert("Updated successfully", "success")
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-2">
            <AddUser showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name="ename" value={user.ename} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="eemail" name="eemail" value={user.eemail} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="isAdmin" className="form-label">Role</label>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="eisAdmin" onChange = {onChange} id="eisAdmin0" checked/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            User
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" onChange = {onChange} id="eisAdmin"  />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Admin
                                        </label>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" row my-3 table-responsive">
                <h2>Users</h2>
                {loading && <Spinner />}
                <div className="container">
                    {users.length === 0 && "No users to display"}
                </div>
                <table className=" table table-secondary table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Edit/Delete</th>
                        </tr>
                    </thead>
                    {!loading && users.map((user) => {
                        return <tbody key={user._id} >
                            <User user={user} updateUser={updateUser} showAlert={props.showAlert} />
                        </tbody>
                    })}
                </table>
            </div>
        </div>
    )
}


export default Users;
