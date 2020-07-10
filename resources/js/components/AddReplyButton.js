import React, {useRef} from 'react';
import {useSelector} from "react-redux";

const AddReplyButton = (props) => {
    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    const replyInput = useRef();

    return (
        <div>
            <button
                type="button"
                className='btn btn-lg btn-primary rounded-circle position-fixed'
                style={style.button}
                title={isAuthenticated ? 'Reply' : 'Login Please.'}
                disabled={!isAuthenticated}
                data-toggle="modal"
                data-target="#addReplyModal"
            ><span className='h2'>+</span>
            </button>

            <div className="modal fade" id="addReplyModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Add Reply</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    id="body"
                                    rows="3"
                                    ref={replyInput}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={()=> {
                                    props.add(replyInput);
                                    replyInput.current.value = '';
                                }}
                            >Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReplyButton;

const style = {
    button: {
        left: '2vw',
        top: '110px'
    }
}
