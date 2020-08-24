import React, {useState, useRef, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Pluralize from 'pluralize';
import AddReplyButton from "../replies/AddReplyButton";
import RepliesPagination from "../replies/RepliesPagination";
import Wysiwyg from "../Wysiwyg";
import {queryCache, useMutation, useQuery} from "react-query";
import {URL} from "../../helpers";

const ShowThread = (props) => {
    const {channel, id} = useParams();

    const [editing, setEditing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [body, setBody] = useState('');

    const inputTitle = useRef('');

    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = {Authorization: `Bearer ${token}`};

    const {isLoading, data: thread} = useQuery('thread', () =>
        Axios.get(URL + `api/threads/${channel}/${id}`)
            .then(response => {
                Axios.get(URL + `api/threads/${response.data.id}/subscriptions/subscribed`,{ headers })
                    .then(response=>{
                        setIsSubscribed(!! response.data);
                    });
                return response.data
            })
    )


    const updateThread = (data) =>{
        Axios({
            method: 'patch',
            url: URL + `api/threads/${channel}/${id}`,
            data,
            headers
        })
            .then(response=>{
                setEditing(false);
                flash('Your thread has been updated.', "success");
                return response;
            })
    }

    const [update] = useMutation(updateThread, {
        onSuccess: () => {
            queryCache.invalidateQueries('thread')
        },
    })

    const deleteThread = (id) => {
        Axios.delete(URL + "api/threads/" + id, {headers})
            .then(response => {
                props.history.push('/threads');
                flash(response.data, "danger");
            })
            .catch(error=>{
                console.log(error);
            });
    };

    const toggleSubscription = () =>{
        Axios({
            method: isSubscribed ? 'delete' : 'post',
            url: URL + `api/threads/${id}/subscriptions`,
            headers
        })
            .then(response=>{
                setIsSubscribed(!isSubscribed);
                flash(response.data, "success");
                return response;
            })
    }

    useEffect(() => {
        Axios({
            method: 'post',
            url: URL + `api/threads/${id}/visits`,
            headers
        })
            .then(response=>{
                console.log(response.data);
            })
    }, [])


    return (
        <div>
            {!isLoading ? (
                <div className="row mt-5">
                    <AddReplyButton thread={thread}/>
                    <div className="col-md-8">
                        <div className="card shadow sticky-top mb-5">
                            <div className="card-body">
                                <div className={`${editing ? '' : "d-flex justify-content-between"} py-2`}>
                                    <div className="card-title align-self-center h5">
                                        {
                                            editing ? (
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="title">Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="title"
                                                            defaultValue={thread.title}
                                                            ref={inputTitle}
                                                        />
                                                    </div>
                                                </form>
                                            ) : (
                                                <>
                                                    <a href={`/profiles/${thread.creator.name}`} className="card-link h4">
                                                        {thread.creator.name}
                                                    </a>{" "}
                                                    posted: {' '}
                                                    {thread.title}
                                                </>
                                            )
                                        }
                                    </div>
                                    {
                                        thread.user_id === user?.id && !editing &&
                                        <Link
                                            to="#"
                                            title="Edit Thread"
                                            className="h2" onClick={()=>setEditing(!editing)}>
                                            <i className="fa fa-pencil-square-o text-primary" aria-hidden="true"></i>
                                        </Link>
                                    }
                                </div>
                                <div className="card-footer">
                                    {
                                        editing ?
                                            (
                                                <div>
                                                    <Wysiwyg trixId={thread.id} defaultValue={thread.body} onChange={(content)=>setBody(content)}></Wysiwyg>
                                                    <div className="mt-2 d-flex justify-content-between">
                                                        <div>
                                                            <button
                                                                title="Cancel"
                                                                className="btn btn-sm btn-warning mr-2"
                                                                onClick={()=>setEditing(!editing)}>
                                                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                                            </button>
                                                            <button
                                                                title="Update Thread"
                                                                className="btn btn-sm btn-primary mr-2"
                                                                onClick={()=>update({
                                                                    title: inputTitle.current.value || thread.title,
                                                                    body: body || thread.body
                                                                })}>
                                                                Update
                                                            </button>
                                                        </div>
                                                        <button
                                                            title="Delete Thread"
                                                            className='btn btn-sm btn-danger'
                                                            onClick={(e)=> deleteThread(thread.id)}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="card-text" dangerouslySetInnerHTML={{__html: thread.body}}/>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <RepliesPagination replies={thread.replies} />
                    </div>
                    <div className="col-md-4">
                        <div className="card sticky-top">
                            <div className="card-body">
                                <h5 className="card-title">
                                    This thread was
                                    published {moment(thread.created_at).fromNow()} by
                                    <Link className='card-link' to={`/profiles/${thread.creator.name}`}>
                                        {" " + thread.creator.name}
                                    </Link>
                                    , and currently has {Pluralize('comment', thread.replies_count, true)}.
                                </h5>
                            </div>
                            {
                                user &&
                                <div className="card-body">
                                    <button className={`btn btn-${isSubscribed ? 'danger' : 'primary'}`} onClick={()=>toggleSubscription()}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-5">
                    <i className="fa fa-cog fa-spin fa-5x fa-fw text-primary"></i>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
        </div>
    );
}

export default ShowThread;
