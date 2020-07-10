import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Replies from './Replies';
import AddReplyButton from "./AddReplyButton";

const ShowThread = () => {
    const { id } = useParams();

    const [thread, setThread] = useState(null);

    const [newReply, setNewReply] = useState(null);

    const deleteReply = (reply)=>{
        Axios.delete('/api/threads/' + reply.thread_id + '/replies/' + reply.id)
            .then(response=>{
                setThread(response.data);
            })
            .catch();
    };

    const addReply = (replyInput)=>{
        Axios.post(`/api/threads/${thread.id}/replies`,{body: replyInput.current.value, auth_user_id: JSON.parse(localStorage.getItem('user')).id})
            .then(response=>{
                console.log(response);
                setNewReply(response.data);
            }).catch(error=>{
            console.log(error.response.data.message);
        });
    }

    useEffect(() => {
        Axios.get(`/api/threads/${id}`)
            .then(response => {
                console.log(response.data);
                setThread(response.data[0]);
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
                        <div className="card shadow sticky-top">
                            <div className="card-body">
                                <div className="d-flex justify-content-between py-2">
                                    <h5 className="card-title align-self-center">
                                        <a href="" className="card-link h4">
                                            {thread.owner.name}
                                        </a>{" "}
                                        posted: {' '}
                                        {moment(thread.created_at).fromNow()}
                                    </h5>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text h5">
                                        {thread.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Replies replies={thread.replies} delete={deleteReply}/>
                    </div>
                    <div className="col-md-4">
                        <div className="card sticky-top">
                            <div className="card-body">
                                <h3 className="card-title text-center">
                                    Notifications
                                </h3>
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
