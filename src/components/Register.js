import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Register = (props) => {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credential.password !== credential.cpassword) {
            props.showAlert("Password is not matched", "danger")
        } else {
            const { name, email, password } = credential;
            const url = "http://localhost:5000/api/auth/createuser"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();

            if (json.success) {
                // redirect
                localStorage.setItem('token', json.authToken);
                history.push('/')
                props.showAlert("Account created successfully", "success")

            } else {
                props.showAlert("Invalid info", "danger")
            }
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form className="container" onSubmit={handleSubmit}>
                <h3 className="text-center my-3">Join us now!</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Name</label>
                    <input type="name" className="form-control" onChange={onChange} name="name" id="name" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} name="email" id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={onChange} id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" className="form-control" onChange={onChange} id="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Register</button>
            </form>
        </div>
    )
}

export default Register;