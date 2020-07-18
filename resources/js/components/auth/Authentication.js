import React, {Fragment } from 'react';
import LogedInLinks from "./LogedInLinks";
import LogedOutLinks from "./LogedOutLinks";
import {useSelector} from "react-redux";

function Authentication (){
    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);
    return (
        <Fragment>
            {isAuthenticated ? (<LogedInLinks />) : (<LogedOutLinks/>)}
        </Fragment>
    )
}

export default Authentication;
