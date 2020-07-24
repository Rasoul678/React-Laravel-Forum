import React from "react";
import { useQuery } from 'react-query';
import Axios from "axios";
import Thread from "./Thread";

const Threads = (props) => {

    const {isLoading, data: threads} = useQuery('threads', () =>
        Axios.get("/api/threads" + props.location.search)
            .then(response => {
                return response.data;
            })
    )

        return (
            <div className="row my-4">
                <div className="col-md-8">
                    {isLoading ? (
                        <div className="text-center mt-5">
                            <i className="fa fa-cog fa-spin fa-5x fa-fw text-primary"></i>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        threads.length ? (
                            threads.map(thread => {
                                return (
                                    <Thread thread={thread} key={thread.id} />
                                );
                            })
                        ) : (
                            <h1>There is no thread yet!</h1>
                        )
                    )}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-center">
                                Notifications
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Threads;
