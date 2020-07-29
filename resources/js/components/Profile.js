import React, {Fragment} from 'react';
import uuid from 'react-uuid'
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import Axios from 'axios';
import {useQuery} from "react-query";

const Profile = () => {

    const {username} = useParams();

    const {isLoading, data} = useQuery('user', () =>
        Axios.get(`/api/profiles/${username}`)
            .then(response => response.data)
    )

    String.prototype.capitalize = function() {
        if (typeof this !== 'string') return '';
        return this.charAt(0).toUpperCase() + this.slice(1)
    }

    return (
        <div className="row">
            <div className="col-md-8">
                {isLoading ? (
                    <div className="text-center mt-5">
                        <i className="fa fa-cog fa-spin fa-5x fa-fw text-primary"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <div>
                        <div className="my-5 h3">
                            <span className='h3'>
                                {
                                    data?.user &&
                                    <Fragment>
                                        {data.user.name} Joined {moment(data?.user.created_at).fromNow()}
                                    </Fragment>
                                }
                            </span>
                        </div>
                        {
                            data?.activities &&
                            Object.entries(data.activities).map(([date, records]) => {
                                return (
                                    <Fragment key={uuid()}>
                                        <hr/>
                                        <h3 className="text-danger my-4">{moment(date).format('MMMM Do YYYY')}</h3>
                                        {
                                            records.map(record=>{
                                                return (
                                                    <div className="card shadow mt-2" key={record.id}>
                                                        <div className="card-footer d-flex justify-content-between">
                                                            <span className='h4'>{data.user.name} {(record.type).split('_')[0].capitalize()} This <Link className="card-link" to={record.subject.path || record.subject.thread.path + "#" + record.subject.id}>{(record.type).split('_')[1].capitalize()}</Link></span>
                                                        </div>
                                                        <div className="card-body" dangerouslySetInnerHTML={{__html: record.subject.body}}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                )}
            </div>
            <div className="col-md-4">
                <h3 className='text-center my-5'>Extra Information</h3>
            </div>
        </div>
    )
}

export default Profile;
