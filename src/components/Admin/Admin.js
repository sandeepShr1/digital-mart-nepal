import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Admin = () => {
    return (
        <div className="container-fluid ">
            <div className="row row-offcanvas row-offcanvas-left">
                <Sidebar />
                <Dashboard />

            </div>
        </div>

    )
}

export default Admin;
