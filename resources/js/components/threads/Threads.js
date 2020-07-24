import React from "react";
import { useQuery } from 'react-query';
import Axios from "axios";
import Thread from "./Thread";

const Threads = (props) => {

    const {isLoading, data} = useQuery('threads', () =>
        Axios.get("/api/threads" + props.location.search)
            .then(response => {
                return response.data;
            })
    )

        return (
            <div className="row my-4">
                <div className="col-md-8">
                    {isLoading ? (
                        <h1 className="text-center">Loading ......</h1>
                    ) : (
                        data.length ? (
                            data.map(thread => {
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
