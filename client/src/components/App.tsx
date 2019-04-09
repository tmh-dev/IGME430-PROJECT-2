import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
// import components
import { Home } from './Home';
import { Pricing } from './Pricing';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import UserPage from './UserPage';
import StoryBoard from './StoryBoard';

export interface IState {
    _csrf: string;
}

export class App extends React.Component<{}, IState> {
    state: IState = {
        _csrf: "",
    };

    componentDidMount() {
        this.getToken();
    }

    private getToken = async (): Promise<any> => {
        try {
            const response = await axios({
                method: 'get',
                url: '/api/getToken',
                headers: {
                    'Accept':'application/json'
                }
            });
            
            this.setState({ _csrf: response.data.csrfToken })
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
                        path="/pricing"
                        component={Pricing}
                    />
                    <Route 
                        path="/login" 
                        render={props => <Login {...props} _csrf={this.state._csrf} />} 
                    />
                    <Route 
                        path="/signup" 
                        render={props => <Signup {...props} _csrf={this.state._csrf} />} 
                    />
                    <Route
                        path="/home"
                        component={UserPage}
                    />
                    <Route
                        exact path="/storyboard"
                        component={StoryBoard}
                    />
                    </div>
                </Router>
            </div>
        );
    }
}