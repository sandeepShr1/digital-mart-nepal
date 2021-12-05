import React, {useContext} from 'react';
import productContext from '../../context/products/productContext';


const User = (props) => {
    const context = useContext(productContext);
    const { deleteUser } = context;
    let { user, updateUser } = props;

    let Role = user.isAdmin;
    if(user.isAdmin === true){
        Role = "Admin";
    }else {
        Role = "User";
    }
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{Role}</td>
            <td>
                <i className="fas fa-edit mx-3" onClick ={() => {updateUser(user._id)}} ></i>
                <i className="fas fa-trash mx -2" onClick={() => { deleteUser(user._id); props.showAlert("User Deleted successfully", "success") }}></i>
            </td>
        </tr>



    );
}

export default User;
