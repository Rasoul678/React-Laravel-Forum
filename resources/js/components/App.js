import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Threads from "./Threads";
import CreateThread from "./CreateThread";
import ShowThread from "./ShowThread";
import  Home from './Home';
import LoginPage from './LoginPage';

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path="/threads" component={Threads} />
                        <Route
                            exact
                            path="/threads/create"
                            component={CreateThread}
                        />
                        <Route
                            exact
                            path="/threads/:id"
                            component={ShowThread}
                        />
                        <Route exact path='/login' component={LoginPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
