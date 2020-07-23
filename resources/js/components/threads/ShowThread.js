import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Pluralize from 'pluralize';
import AddReplyButton from "../replies/AddReplyButton";
import RepliesPagination from "../replies/RepliesPagination";

const ShowThread = (props) => {
    const {channel, id} = useParams();

    const [thread, setThread] = useState(null);

    const deleteReply = (reply) => {
        Axios.delete('/api/threads/' + reply.thread_id + '/replies/' + reply.id)
            .then(response => {
                setThread(response.data);
                flash("Your reply has been deleted.", "danger");
            })
            .catch();
    };

    const addReply = (replyBody) => {
        Axios.post(`/api/threads/${thread.id}/replies`, {
            body: replyBody,
            auth_user_id: JSON.parse(localStorage.getItem('user')).id
        })
            .then(response => {
                setThread(response.data);
                flash('Your reply has been created.', "success");
            }).catch(error => {
            console.log(error.response.data.message);
        });
    }

    useEffect(() => {
        Axios.get(`/api/threads/${channel}/${id}`)
            .then(response => {
                setThread(response.data);
            })
            .catch(error => {
                console.log(error.response);
            });
    }, []);

    const deleteThread = (id) => {
        const token = localStorage.getItem('access_token');
        const headers = {Authorization: `Bearer ${token}`};
        Axios.delete("/api/threads/" + id, {headers})
            .then(response => {
                props.history.push('/threads');
                flash(response.data, "danger");
            })
            .catch(error=>{
                console.log(error);
            });
    };

    return (
        <div>
            {thread ? (
                <div className="row mt-5">
                    <AddReplyButton add={addReply}/>
                    <div className="col-md-8">
                        <div className="card shadow sticky-top mb-5">
                            <div className="card-body">
                                <div className="d-flex justify-content-between py-2">
                                    <h5 className="card-title align-self-center">
                                        <a href={`/profiles/${thread.creator.name}`} className="card-link h4">
                                            {thread.creator.name}
                                        </a>{" "}
                                        posted: {' '}
                                        {thread.title}
                                    </h5>
                                    {
                                        thread.user_id === JSON.parse(localStorage.getItem('user'))?.id &&
                                        <Link to='#' className='h4 text-danger' onClick={(e)=>{
                                            e.preventDefault();
                                            deleteThread(thread.id);
                                        }}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </Link>
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="card-text" dangerouslySetInnerHTML={{__html: thread.body}}/>
                                </div>
                            </div>
                        </div>
                        <RepliesPagination replies={thread.replies} delete={deleteReply}/>
                    </div>
                    <div className="col-md-4">
                        <div className="card sticky-top">
                            <div className="card-body">
                                <h5 className="card-title">
                                    This thread was
                                    published {moment(thread.created_at).fromNow()} by
                                    <Link className='card-link' to={`/profiles/${thread.creator.name}`}>
                                        {" " + thread.creator.name}
                                    </Link>
                                    , and currently has {Pluralize('comment', thread.repliesCount, true)}.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default ShowThread;
