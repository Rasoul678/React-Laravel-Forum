import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import moment from "moment";

const useFetch = url => {
    const [thread, setThread] = useState(null);

    useEffect(() => {
        Axios.get(url)
            .then(response => {
                setThread(response.data[0]);
            })
            .catch(error => {
                console.log(error.response);
            });
    }, [url]);

    return thread;
};

function ShowThread() {
    const { id } = useParams();

    const url = `/api/threads/${id}`;

    const thread = useFetch(url);

    const [reply, setReply] = useState(null);

    return (
        <div>
            {thread ? (
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href="" className="card-link h4">
                                        {thread.owner.name}
                                    </a>{" "}
                                    posted:
                                    {moment(thread.created_at).fromNow()}
                                </h5>
                                <div className="card-footer">
                                    <p className="card-text h5">
                                        {thread.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4 shadow">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="body">Reply</label>
                                    <textarea
                                        className="form-control"
                                        id="body"
                                        rows="3"
                                        onChange={(e)=>{
                                            setReply(e.target.value);
                                        }}
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={(e)=>{
                                        Axios.post(`/api/threads/${thread.id}/replies`,{body: reply, auth_user_id:window.App.user.id})
                                        .then(response=>{
                                            console.log(response);
                                        }).catch(error=>{
                                            console.log(error.response.data.message);
                                        });
                                    }}
                                >
                                    Post
                                </button>
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
