import React from "react";
import { Link } from "react-router-dom";
import Pluralize from "pluralize";

const Thread = ({ thread}) => {

    return (
        <div className="card shadow mb-3">
            <div className="card-header">
                <div className="card-title d-flex justify-content-between">
                    <div>
                        <Link className='card-link h4' to={`/profiles/${thread.creator.name}`}>
                            {thread.creator.name}
                        </Link>
                        <Link className='card-link text-dark h5' to={thread.path} >
                            Posted: {thread.title}
                        </Link>
                    </div>
                    <span className='card-link text-dark h5'>
                         {Pluralize('reply', thread.replies_count, true)}
                    </span>
                </div>
            </div>
            <div className="card-body">
                <div className="card-text" dangerouslySetInnerHTML={{__html: thread.body}} />
            </div>
        </div>
    );
}

export default Thread;
