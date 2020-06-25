import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';
import Threads from './Threads';
import CreateThread from './CreateThread';
import ShowThread from './ShowThread';

class App extends Component {
    render(){
        return (
            <Router>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path='/threads' component={Threads} />
                        <Route exact path='/threads/create' component={CreateThread} />
                        <Route exact path='/threads/:id' component={ShowThread} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
