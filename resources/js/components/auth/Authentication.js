import React, {Fragment } from 'react';
import LogedInLinks from "./LogedInLinks";
import LogedOutLinks from "./LogedOutLinks";

function Authentication (props){
    return (
        <Fragment>
            {props.user ? (<LogedInLinks />) : (<LogedOutLinks/>)}
        </Fragment>
    )
}

export default Authentication;
