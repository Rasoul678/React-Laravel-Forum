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

    deleteThread = (id) => {
        Axios.delete("api/threads/" + id)
            .then(response => {
                this.setState({
                    ...this.state,
                    threads: this.state.threads.filter(thread => {
                        return thread.id !== id;
                    })
                });
            });
    }

    render() {
        const { threads } = this.state;
        return (
            <div className="row justify-content-center">
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
            </div>
        );
    }
}

export default Threads;
