import React from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import { withRouter } from "react-router";


const LoggedInLinks = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = ()=>{
        const token = localStorage.getItem('access_token');
        const headers = {Authorization: `Bearer ${token}`};
        Axios.get('/api/auth/logout', {headers})
            .then(response=>{
                console.log(response);
                flash("See you!", "success");
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
            }).catch(error=>{
            console.log(error);
        });
    }

    return (
        <>
            <li className="nav-item">
                <Link className="navbar-brand" to="/threads/create">
                    <span className="h5">+New</span>
                </Link>
                <Link className="navbar-brand" to={`/profiles/${user.name}`}>
                    <span className="h5">{ user?.name }</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="navbar-brand" to='' onClick={()=>logout()}>
                    <span className="h5">Logout</span>
                </Link>
            </li>
        </>
    )
}

export default withRouter(LoggedInLinks);
