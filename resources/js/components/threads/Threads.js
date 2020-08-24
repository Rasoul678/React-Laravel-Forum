import React, {useState, useEffect} from "react";
import Axios from "axios";
import {useHistory} from "react-router";
import ThreadsPagination from "./ThreadsPagination";

const Threads = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [threads, setThreads] = useState([])

    const history = useHistory();

    useEffect(()=>{
        Axios.get(`/api${history.location.pathname}${history.location.search}`)
            .then(response => {
                setIsLoading(false);
                setThreads(response.data);
            })
            .catch(error=>{
                setIsLoading(false);
            })
    }, [history.location])

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
                            <ThreadsPagination threads={threads}/>
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
