import React from "react";
import { Link } from "react-router-dom";
import Pluralize from "pluralize";

const Thread = ({ thread}) => {

    return (
        <div className="card shadow mb-3">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <div className="card-title">
                        <Link className='card-link h4' to={`/profiles/${thread.creator.name}`}>
                            {thread.creator.name}
                        </Link>
                        <Link className='card-link text-dark h5' to={thread.path} >
                            {thread.title} ( has {Pluralize('reply', thread.repliesCount, true)} )
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="card-text" dangerouslySetInnerHTML={{__html: thread.body}} />
            </div>
        </div>
    );
}

export default Thread;
