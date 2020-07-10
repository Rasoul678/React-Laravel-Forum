import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import { withRouter } from "react-router";
import {useDispatch} from "react-redux";



function IsLogedIn() {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = ()=>{
        Axios.post('/api/auth/logout')
            .then(response=>{
                console.log(response);
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                dispatch({type: 'LOG_OUT'})
            }).catch(error=>{
            console.log(error);
        });
    }

    return (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to='/profile'>
                    <span className="h5">{ user?.name }</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='' onClick={()=>logout()}>
                    <span className="h5">Logout</span>
                </Link>
            </li>
        </Fragment>
    )
}

export default withRouter(IsLogedIn);
