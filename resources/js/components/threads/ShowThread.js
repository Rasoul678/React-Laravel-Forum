import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Pluralize from 'pluralize';
import AddReplyButton from "../replies/AddReplyButton";
import RepliesPagination from "../replies/RepliesPagination";

const ShowThread = () => {
    const {channel, id} = useParams();

    const [thread, setThread] = useState(null);

    const [newReply, setNewReply] = useState(null);

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
                setNewReply(response.data);
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
    }, [newReply]);

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
                                    published {moment(thread.created_at).fromNow()} by {thread.creator.name}, and
                                    currently has {Pluralize('comment', thread.repliesCount, true)}.
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
