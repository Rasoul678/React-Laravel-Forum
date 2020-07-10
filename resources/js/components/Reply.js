import React, { useState, useRef} from 'react';
import Axios from 'axios';

const Reply = (props) =>{
    const {reply } = props;
    const replyInput = useRef();

    const [editing, setEditing] = useState(false);

    const [update, setUpdate] = useState('');

    return (
        <div className='card my-3'>
            <div className="card-body">
                {
                    editing ? (
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="body"
                                rows="3"
                                defaultValue={reply.body}
                                ref={replyInput}
                            ></textarea>
                            <button
                                className='btn btn-sm btn-primary mt-2'
                                onClick={()=>{
                                    Axios.patch('/api/threads/' + reply.thread_id + '/replies/' + reply.id, {body: replyInput.current.value})
                                        .then(response=>{
                                            setEditing(false);
                                            setUpdate(response.data)
                                            console.log(response.data)
                                        })
                                        .catch(error=>{
                                            console.log(error);
                                        });
                                }}
                            >Update</button>
                        </div>
                    ) :(
                        <blockquote>
                            <h5 className="card-title">
                                {update ? update.body : reply.body}
                            </h5>
                        </blockquote>
                    )
                }
            </div>
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
        </div>
    )
}

export default Reply;
