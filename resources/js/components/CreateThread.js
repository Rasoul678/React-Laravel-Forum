import React, { useState } from "react";
import Axios from "axios";

function CreateThread(props) {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState(false);

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
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
                                <label htmlFor="body">Body</label>
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
                                Axios.post("/api/threads", { title, body })
                                    .then(response => {
                                        console.log(response);
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
