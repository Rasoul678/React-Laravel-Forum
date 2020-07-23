import React, { Component } from "react";
import Axios from "axios";
import Thread from "./Thread";

class Threads extends Component {
    state = {
        threads: []
    };

    componentWillMount() {
        Axios.get("/api/threads" + this.props.location.search)
            .then(response => {
                this.setState({
                    ...this.state,
                    threads: response.data
                });
            })
            .catch(error=>{
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            Axios.get("/api/threads" + this.props.location.search)
                .then(response => {
                    this.setState({
                        ...this.state,
                        threads: response.data
                    });
                });
        }
    }

    render() {
        const { threads } = this.state;
        return (
            <div className="row my-4">
                <div className="col-md-8">
                    {threads.length ? (
                        threads.map(thread => {
                            return (
                                <Thread thread={thread} key={thread.id} />
                            );
                        })
                    ) : (
                        <h1>There is no thread yet!</h1>
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
}

export default Threads;
