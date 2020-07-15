import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

function IsLogedOut (){
    return (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    <span className="h5">Login</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    <span className="h5">Register</span>
                </Link>
            </li>
        </Fragment>
    )
}

export default IsLogedOut;
