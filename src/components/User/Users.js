import React, { useEffect, useContext } from 'react';
import Spinner from '../../container/Spinner';
import productContext from '../../context/products/productContext';
import AddUser from './AddUser'
import User from './User';
import { useHistory } from 'react-router-dom';

const Users = (props) => {
    const context = useContext(productContext);
    const {users, getAllUsers, loading } = context;
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

    return (
        <div className="container my-2">
            <AddUser showAlert={props.showAlert} />
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
                            <User user={user} showAlert={props.showAlert} />
                        </tbody>
                    })}
                </table>
            </div>
        </div>
    )
}


export default Users;
