import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
// import components
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Navbar/>
                    <div>
                    <Route path='/' exact component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;