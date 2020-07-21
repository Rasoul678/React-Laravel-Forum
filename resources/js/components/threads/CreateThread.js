import React, { useState } from "react";
import Axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {ADD_THREAD} from '../../constants';
import Wysiwyg from "../Wysiwyg";

function CreateThread(props) {
    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    if(! isAuthenticated){
        props.history.push('/login');
    }
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const formData = { title, body, user_id: user?.id };

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
                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                    id="title"
                                    name="title"
                                    placeholder="Thread title"
                                    onChange={e => {
                                        setTitle(e.target.value)
                                    }}/>
                                    {errors ? (<div className="invalid-feedback">{errors.title}</div>) : ""}
                            </div>

                            <div className="form-group">
                                <label htmlFor="body" className='h5'>Body</label>
                                <Wysiwyg trixId="threadBody" placeholder='Thread Body' onChange={(content)=>setBody(content)}></Wysiwyg>
                            </div>
                        </form>
                        <button
                            type="button"
                            className="btn btn-primary mb-2"
                            onClick={() => {
                                const token = localStorage.getItem('access_token');
                                const headers = {Authorization: `Bearer ${token}`};
                                Axios.post("/api/threads", formData, {headers})
                                    .then(response => {
                                        console.log(response.data);
                                        dispatch({
                                            type: ADD_THREAD,
                                            thread: response.data
                                        });
                                        props.history.push("/threads");
                                        flash("Your thread has been created.", "success")
                                    })
                                    .catch(error => {
                                        console.log(error.response.data);
                                        setErrors(error.response.data);
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
