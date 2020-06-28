import React, { useState } from "react";
import Axios from 'axios';
import { useDispatch } from "react-redux";
import {ADD_THREAD} from '../Constants';

function CreateThread(props) {
    if(! window.App.signedIn){
        props.history.push('/login');
    }
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState(false);

    const dispatch = useDispatch();

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 mt-5">
                <div className="card shadow">
                    <h3 className="card-header text-center">
                        Create New Thread
                    </h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title" className='h5'>Title</label>
                                <input
                                    type="test"
                                    className={`form-control ${
                                        errors.title ? "is-invalid" : ""
                                    }`}
                                    id="title"
                                    name="title"
                                    placeholder="Thread title"
                                    onChange={e => {
                                        setTitle(e.target.value);
                                    }}
                                />
                                {errors ? (
                                    <div className="invalid-feedback">
                                        {errors.title}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="body" className='h5'>Body</label>
                                <textarea
                                    className={`form-control ${
                                        errors.body ? "is-invalid" : ""
                                    }`}
                                    id="body"
                                    rows="3"
                                    placeholder="Thread Body"
                                    onChange={e => {
                                        setBody(e.target.value);
                                    }}
                                ></textarea>
                                {errors ? (
                                    <div className="invalid-feedback">
                                        {errors.body}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </form>
                        <button
                            type="button"
                            className="btn btn-primary mb-2"
                            onClick={() => {
                                Axios.post("/api/threads", { title, body, auth_user_id: window.App.user.id })
                                    .then(response => {
                                        console.log(response);
                                        dispatch({
                                            type: ADD_THREAD,
                                            thread: response.data
                                        });
                                        props.history.push("/threads");
                                    })
                                    .catch(error => {
                                        console.log(error.response.data.errors);
                                        setErrors(error.response.data.errors);
                                    });
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateThread;
