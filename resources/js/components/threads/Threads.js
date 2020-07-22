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

    deleteThread = id => {
        const token = localStorage.getItem('access_token');
        const headers = {Authorization: `Bearer ${token}`};
        Axios.delete("api/threads/" + id, {headers})
            .then(response => {
                console.log(response.data);
                this.setState({
                    ...this.state,
                    threads: this.state.threads.filter(thread => {
                        return thread.id !== id;
                    })
                });
                flash("Your thread has been deleted", "danger");
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
