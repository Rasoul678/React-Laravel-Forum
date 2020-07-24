import React, { useState } from "react";
import Axios from 'axios';
import {useSelector} from "react-redux";
import Wysiwyg from "../Wysiwyg";
import {useQuery} from "react-query";

function CreateThread(props) {
    const isAuthenticated = useSelector(state=>state.authReducer.isAuthenticated);

    if(! isAuthenticated){
        props.history.push('/login');
    }

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [channel, setChannel] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    const formData = { title, body, user_id: user?.id, channel_id:  channel};

    const {data: channels} = useQuery('channels', () =>
        Axios.get('/api/channels')
            .then(response=>response.data)
    )

    const createThread = ()=>{
        const token = localStorage.getItem('access_token');
        const headers = {Authorization: `Bearer ${token}`};
        Axios.post("/api/threads", formData, {headers})
            .then(response => {
                props.history.push(response.data.path);
                flash("Your thread has been created.", "success")
            })
            .catch(error => {
                console.log(error.response.data);
                let errors = error.response.data.errors;
                if(errors.channel_id){
                    flash("The channel field is required.", "danger");
                }else if(errors.title){
                    flash(errors.title[0], "danger");
                }else if(errors.body){
                    flash(errors.body[0], "danger");
                }
            });
    }

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
                                <label htmlFor="channel" className='h5'>Channel</label>
                                <select className="form-control" id="channel" onChange={e=>setChannel(e.target.value)}>
                                    <option value=''>Choose a Channel ...</option>
                                    {
                                        channels?.map(channel=>{
                                            return (<option value={channel.id} key={channel.id}>{channel.name}</option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="title" className='h5'>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Thread title"
                                    onChange={e => {
                                        setTitle(e.target.value)
                                    }}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="body" className='h5'>Body</label>
                                <Wysiwyg trixId="threadBody" placeholder='Thread Body' onChange={(content)=>setBody(content)}></Wysiwyg>
                            </div>
                        </form>
                        <button
                            type="button"
                            className="btn btn-primary mb-2"
                            onClick={() => createThread()}
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
