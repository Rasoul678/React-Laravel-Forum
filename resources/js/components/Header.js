import React, { Fragment, useState } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

function Header(props) {

    const [signedIn, setsignin]= useState(window.App.signedIn);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <span className='h3'>Forum</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className='h5'>Threads</span>
                            </a>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to="/threads">
                                    All Threads
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/threads/create">
                                <span className="h5">Add Thread</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav ml-auto'>
                        {signedIn ? (
                            <li className="nav-item">
                                <Link className="nav-link" to='' onClick={()=>{
                                    Axios.post('/logout').then(response=>{
                                        console.log(response);
                                        props.history.push('/');
                                    });
                                }}>
                                    <span className="h5">Logout</span>
                                </Link>
                            </li>
                        ) : (
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
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default  withRouter(Header);
