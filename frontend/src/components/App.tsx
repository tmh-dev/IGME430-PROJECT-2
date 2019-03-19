import * as React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
// import components
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';

export interface IState {
    csrf: string,
}

export class App extends React.Component<{}, IState> {
    state: IState = {
        csrf: ''
    };

    private getToken = (): string => {
        return sendAjax('/getToken', 'GET', null).toString();
    }

    public render() {
        return (
            <div>
                <Router>
                    <Navbar/>
                    <div>
                    <Route path="/" exact component={Home} />
                    <Route 
                        path="/login" 
                        render={props => <Login {...props} csrf={this.getToken()} />} 
                    />
                    <Route 
                        path="/signup" 
                        render={props => <Signup {...props} csrf={this.getToken()} />} 
                    />
                    </div>
                </Router>
            </div>
        );
    }
}