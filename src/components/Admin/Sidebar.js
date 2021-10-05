import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li className="nav-item mb-2 mt-3"><Link className="nav-link text-secondary" to="#"><h5>Jacob Nejam</h5></Link></li>
                <li className="nav-item mb-2 "><Link className="nav-link text-secondary" to="#"><i className="fas fa-user font-weight-bold"></i> <span className="ml-3">Overview</span></Link></li>
                <li className="nav-item mb-2">
                    <Link className="nav-link text-secondary" to="#submenu1" data-toggle="collapse" data-target="#submenu1"><i className="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Reports▾</span></Link>
                    <ul className="list-unstyled flex-column pl-3 collapse" id="submenu1" >
                        <li className="nav-item mb-2 "><Link className="nav-link text-secondary" to=""><i className="fas fa-book-reader"></i> Data Report </Link></li>
                        <li className="nav-item mb-2 "><Link className="nav-link text-secondary" to=""> <i className="fas fa-book-medical"></i> File Report </Link></li>
                    </ul>
                </li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#"><i className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Analytics</span></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#"><i className="fas fa-file-export font-weight-bold"></i><span className="ml-3">Export</span></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#"><i className="fas fa-tablet-alt font-weight-bold"></i><span className="ml-3">Snippets</span></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#"><i className="fas fa-atom font-weight-bold"></i> <span className="ml-3">Flex</span></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#"><i className="far fa-folder font-weight-bold"></i> <span className="ml-3">Layouts</span></Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#">Templates</Link></li>
                <li className="nav-item mb-2"><Link className="nav-link text-secondary" to="#">Themes</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar;