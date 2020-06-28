import React, { Component } from "react";
import Axios from "axios";
import Thread from "./Thread";

class Threads extends Component {
    state = {
        threads: []
    };

    componentDidMount() {
        Axios.get("/api/threads").then(response => {
            this.setState({
                ...this.state,
                threads: response.data
            });
        });
    }

    deleteThread = id => {
        Axios.delete("api/threads/" + id).then(response => {
            this.setState({
                ...this.state,
                threads: this.state.threads.filter(thread => {
                    return thread.id !== id;
                })
            });
        });
    };

    render() {
        const { threads } = this.state;
        return (
            <div className="row my-4">
                <div className="col-md-8">
                    {threads.length ? (
                        threads.map(thread => {
                            return (
                                <Thread
                                    thread={thread}
                                    deleteThread={this.deleteThread}
                                    key={thread.id}
                                />
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
