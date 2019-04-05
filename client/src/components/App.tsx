import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
// import components
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import UserPage from './UserPage';
import StoryBoard from './StoryBoard';
import { sendAjax } from '../api/APIUtils';

export interface IState {
    csrf: string,
}

export class App extends React.Component<{}, IState> {
    state: IState = {
        csrf: ''
    };

    componentDidUpdate() {

    }

    private getToken = async (): Promise<any> => {
        try {
            const response = await axios({
                method: 'get',
                url: '/api/getToken',
                responseType: 'text'
            });

            
            console.log(response);
        } catch (err) {
            console.log(err);
        }
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
                        render={props => <Login {...props} getToken={this.getToken} />} 
                    />
                    <Route 
                        path="/signup" 
                        render={props => <Signup {...props} getToken={this.getToken} />} 
                    />
                    <Route
                        path="/user"
                        component={UserPage}
                    />
                    <Route
                        path="/storyboard"
                        component={StoryBoard}
                    />
                    </div>
                </Router>
            </div>
        );
    }
}