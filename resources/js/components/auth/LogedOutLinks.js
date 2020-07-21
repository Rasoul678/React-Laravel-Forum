import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

function LogedOutLinks (){
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default LogedOutLinks;
