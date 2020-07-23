import React, {useState} from 'react';
import {useSelector} from "react-redux";
import Wysiwyg from "../Wysiwyg";

const AddReplyButton = (props) => {
    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    const [body, setBody] = useState('');

    return (
        <div>
            <button
                type="button"
                className='btn btn-lg btn-primary rounded-circle position-fixed'
                style={style.button}
                title={isAuthenticated ? 'Leave a Reply' : 'Login and Leave a Reply.'}
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
                                <Wysiwyg placeholder="Have something to say?" onChange={(content)=>setBody(content)}></Wysiwyg>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={()=> {
                                    props.add(body);
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
