import React from 'react';
// import productContext from '../../context/products/productContext';


const User = (props) => {
    // const context = useContext(productContext);
    // const { deleteProduct } = context;
    let { user } = props;

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
                <i className="fas fa-edit mx-3" ></i>
                <i className="fas fa-trash mx -2"></i>
            </td>
        </tr>



    );
}

export default User;
