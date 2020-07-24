import React from 'react';
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import Axios from 'axios';
import {useQuery} from "react-query";

const Profile = () => {

    const {username} = useParams();

    const {isLoading, data: user} = useQuery('user', () =>
        Axios.get(`/api/profiles/${username}`)
            .then(response => response.data)
    )

    return (
        <div className="row">
            <div className="col-md-7">
                {isLoading ? (
                    <div className="text-center mt-5">
                        <i className="fa fa-cog fa-spin fa-5x fa-fw text-primary"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div>
                        <div className="my-5 h3">
                            <span className='h2'>{user.name} </span>Joined {moment(user.created_at).fromNow()}
                        </div>
                        <hr/>
                        {
                            user.threads.map(thread => {
                                return (
                                    <div className="card shadow mt-2" key={thread.id}>
                                        <div className="card-footer d-flex justify-content-between">
                                            <span className='h4'>Title : <Link className="card-link" to={thread.path}>{thread.title}</Link></span>
                                            <span className='h6'>Posted: {moment(thread.created_at).fromNow()}</span>
                                        </div>
                                        <div className="card-body" dangerouslySetInnerHTML={{__html: thread.body}}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>
            <div className="col-md-5">
                <h3 className='text-center my-5'>Extra Information</h3>
            </div>
        </div>
    )
}

export default Profile;
