import React, {useState} from 'react';
import Wysiwyg from "../Wysiwyg";
import Axios from "axios";
import {queryCache, useMutation} from "react-query";
import {URL} from "../../helpers";

const AddReplyButton = ({thread}) => {

    const token = localStorage.getItem('access_token');
    const headers = {Authorization: `Bearer ${token}`};
    const authUser = JSON.parse(localStorage.getItem('user'));

    const [body, setBody] = useState('');

    const addReply = (data) => {
        Axios({
            method: 'post',
            url: URL + `api/threads/${thread.id}/replies`,
            data,
            headers
        })
            .then(response => {
                flash('Your reply has been created.', "success");
                return response;
            })
    }

    const [add] = useMutation(addReply, {
        onSuccess: () => {
            queryCache.invalidateQueries('thread')
        },
    })

    return (
        <div>
            <button
                type="button"
                className='btn btn-lg btn-primary rounded-circle position-fixed'
                style={style.button}
                title={authUser ? 'Leave a Reply' : 'Login and Leave a Reply.'}
                disabled={!! authUser ? false : true}
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
                                onClick={()=>add({body})}
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
