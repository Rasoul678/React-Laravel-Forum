import React, { Component } from "react";
import { Link } from "react-router-dom";

class Thread extends Component {
    render(){
        const { thread, deleteThread } = this.props;
        return (
            <div className="card shadow mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h3 className="card-title">
                            <Link className='card-link text-dark' to={`/threads/${thread.id}`} >
                                {thread.title}
                            </Link>
                        </h3>
                        <Link to='' className='h4 text-danger' onClick={(e)=>{
                            e.preventDefault();

                            deleteThread(thread.id);
                        }}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </Link>
                    </div>
                    <p className="card-text">{thread.body}</p>
                </div>
            </div>
        );
    }
}

export default Thread;
