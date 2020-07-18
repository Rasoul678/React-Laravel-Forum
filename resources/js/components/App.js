import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Threads from "./threads/Threads";
import CreateThread from "./threads/CreateThread";
import ShowThread from "./threads/ShowThread";
import  Home from './Home';
import LoginPage from './auth/LoginPage';
import RegisterPage from "./auth/RegisterPage";

class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path="/threads" component={Threads} />
                        <Route exact path="/threads/create" component={CreateThread} />
                        <Route exact path="/threads/:id" component={ShowThread} />
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/register' component={RegisterPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
