import React from 'react';
import {Link} from "react-router-dom";

function LoggedOutLinks (){
    return (
        <>
            <li className="nav-item">
                <Link className="navbar-brand" to="/login">
                    <span className="h5">Login</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="navbar-brand" to="/register">
                    <span className="h5">Register</span>
                </Link>
            </li>
        </>
    )
}

export default LoggedOutLinks;
