import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import {useSelector} from "react-redux";
import Wysiwyg from "../Wysiwyg";
import moment from "moment";

const Reply = (props) =>{
    const {reply } = props;

    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    const [editing, setEditing] = useState(false);

    const [update, setUpdate] = useState('');

    const [body, setBody] = useState('');

    return (
        <div className='card my-3'>
            <div className="card-body">
                {
                    editing ? (
                        <div className="form-group">
                            <Wysiwyg trixId={reply.id} defaultValue={update.body || reply.body} onChange={(content)=>setBody(content)}></Wysiwyg>
                            <button
                                className='btn btn-sm btn-primary mt-2'
                                onClick={()=>{
                                    Axios.patch('/api/threads/' + reply.thread_id + '/replies/' + reply.id, {body: body})
                                        .then(response=>{
                                            setEditing(false);
                                            setUpdate(response.data)
                                        })
                                        .catch(error=>{
                                            console.log(error);
                                        });
                                }}
                            >Update</button>
                        </div>
                    ) :(
                        <blockquote>
                            <div className="card-title">
                                <div className="my-3">
                                    <Link className="card-link" to="#/profile">
                                        <span className="h4">{ reply.user.name}</span>
                                    </Link>
                                    { ' : ' }
                                    <span className="h5">replied {moment(reply.created_at).fromNow()}</span>
                                </div>
                                <hr/>
                                {update ? (
                                    <div dangerouslySetInnerHTML={{__html: update.body}} />
                                ): (
                                    <div dangerouslySetInnerHTML={{__html: reply.body}} />
                                )}

                            </div>
                        </blockquote>
                    )
                }
            </div>
            {
                    isAuthenticated && reply.user_id == JSON.parse(localStorage.getItem('user')).id &&
                <div className="card-footer">
                    <div className="form-group">
                        <button
                            className={`btn btn-sm ${editing? 'btn-warning' : 'btn-success'} mr-2`}
                            onClick={()=>setEditing(!editing)}
                        >
                            {editing? (
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            ) : (
                                <i className="fa fa-pencil-square-o text-dark" aria-hidden="true"></i>
                            )}
                        </button>
                        <button
                            className='btn btn-sm btn-danger'
                            onClick={()=>props.delete(reply)}
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Reply;
