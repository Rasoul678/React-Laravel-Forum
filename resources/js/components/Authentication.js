import React, {Fragment} from 'react';
import IsLogedIn from "./IsLogedIn";
import IsLogedOut from "./IsLogedOut";
import {useSelector} from "react-redux";

function Authentication (){
    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);
    return (
        <Fragment>
            {isAuthenticated ? (<IsLogedIn />) : (<IsLogedOut/>)}
        </Fragment>
    )
}

export default Authentication;
