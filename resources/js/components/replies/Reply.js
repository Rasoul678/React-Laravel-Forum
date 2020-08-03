import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';
import Wysiwyg from "../Wysiwyg";
import moment from "moment";
import {queryCache, useMutation} from "react-query";

const Reply = ({ reply }) =>{
    const [editing, setEditing] = useState(false);

    const [favoritesCount, setFavoritesCount] = useState(reply.favoritesCount);

    const [isFavored, setIsFavored] = useState(false);

    const [update, setUpdate] = useState('');

    const [body, setBody] = useState('');

    const token = localStorage.getItem('access_token');
    const headers = {Authorization: `Bearer ${token}`};
    const authUser = JSON.parse(localStorage.getItem('user'));

    const deleteReply = (reply) => {
        Axios.delete('/api/threads/' + reply.thread_id + '/replies/' + reply.id, {headers})
            .then(response => {
                flash("Your reply has been deleted.", "danger");
                return response;
            })
    };

    const [destroy] = useMutation(deleteReply, {
        onSuccess: () => {
            queryCache.invalidateQueries('thread')
        },
    })

    useEffect(()=>{
        Axios.get(`/api/replies/${reply.id}/favorites/favored`,{ headers })
            .then(response=>{
                setIsFavored(!! response.data);
            }).catch(error=>{
            console.log(error);
        });
    }, [update])

    const updateReply = () =>{
        const data = {body};
        Axios({
            method: 'patch',
            url: `/api/threads/${reply.thread_id}/replies/${reply.id}`,
            data,
            headers
        })
        .then(response=>{
            setEditing(false);
            setUpdate(response.data)
            flash('Your reply has been updated.', "success");
        })
        .catch(error=>{
            console.log(error);
        });
    }

    const toggleFavorite = (e) =>{
        e.preventDefault();
        Axios({
            method: isFavored ? 'delete' : 'get',
            url: `/api/replies/${reply.id}/favorites`,
            headers
        })
            .then(response=>{
                setFavoritesCount(response.data.favoritesCount);
                setIsFavored(!isFavored);
            })
            .catch(error=>{
                console.log(error);
            });
    }

    return (
        <div className='card my-3' id={`#${reply.id}`}>
            <div className="card-body">
                {
                    editing ? (
                        <div className="form-group">
                            <Wysiwyg trixId={reply.id} defaultValue={update.body || reply.body} onChange={(content)=>setBody(content)}></Wysiwyg>
                            <button
                                className='btn btn-sm btn-primary mt-2'
                                onClick={()=>updateReply()}
                            >Update</button>
                        </div>
                    ) :(
                        <blockquote>
                            <div className="card-title">
                                <div className="my-3 d-flex justify-content-between">
                                    <div>
                                        <Link className="card-link" to={`/profiles/${ reply.owner.name}`}>
                                            <span className="h4">{ reply.owner.name}</span>
                                        </Link>
                                        {" "}
                                        <span className="h5">said: {moment(reply.created_at).fromNow()}</span>
                                    </div>
                                    {
                                        authUser &&
                                        <div>
                                            <Link to='#' className='h4' onClick={(e)=>toggleFavorite(e)}>
                                                <i className={`fa fa-heart ${isFavored ? 'text-danger' : 'text-secondary'}`} aria-hidden="true"> {favoritesCount}</i>
                                            </Link>
                                        </div>
                                    }
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
                    authUser && reply.user_id == authUser.id &&
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
                            onClick={()=>destroy(reply)}
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
