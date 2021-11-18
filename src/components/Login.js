import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        
        if(json.success) {
            // redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert(`Welcome back ${credential.email}` , "success")
            history.push("/")
        } else {
            props.showAlert("invalid email/password", "danger")
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>
                <h3 className="text-center my-3">Login to admin page</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credential.email} name="email" id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={onChange} value={credential.password} id="password" required />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login;