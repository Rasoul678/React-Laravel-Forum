import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Pluralize from "pluralize";

class Thread extends Component {
    render(){
        const { thread, deleteThread, isAuthenticated } = this.props;
        return (
            <div className="card shadow mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        <div className="card-title">
                            <Link className='card-link h4' to='/profile'>
                                {thread.creator.name}
                            </Link>
                            <Link className='card-link text-dark h5' to={thread.path} >
                                {thread.title} ( has {Pluralize('reply', thread.repliesCount, true)} )
                            </Link>
                        </div>
                        <div>
                            {
                                isAuthenticated && thread.user_id == JSON.parse(localStorage.getItem('user')).id &&
                                <Link to='' className='h4 text-danger' onClick={(e)=>{
                                    e.preventDefault();

                                    deleteThread(thread.id);
                                }}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-text" dangerouslySetInnerHTML={{__html: thread.body}} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        isAuthenticated : state.authReducer.isAuthenticated
    }
}

export default connect(mapStateToProps)(Thread);
