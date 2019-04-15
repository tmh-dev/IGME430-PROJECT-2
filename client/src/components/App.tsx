import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// import components
import { Home } from './Home';
import { Pricing } from './Pricing';
import Login from './account/Login';
import Signup from './account/Signup';
import Navbar from './Navbar';
import StoryBoard from './StoryBoard';
import Settings from './Settings';

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

    // grabs csrf protection token for all application's forms
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
                        exact path="/pricing"
                        component={Pricing}
                    />
                    <Route 
                        exact path="/login" 
                        render={props => <Login {...props} _csrf={this.state._csrf} />} 
                    />
                    <Route 
                        exact path="/signup" 
                        render={props => <Signup {...props} _csrf={this.state._csrf} />} 
                    />
                    <Route
                        exact path="/storyboard"
                        render={props => <StoryBoard {...props} _csrf={this.state._csrf} />}
                    />
                    <Route
                        exact path="/settings"
                        render={props => <Settings {...props} _csrf={this.state._csrf} />}
                    />
                    </div>
                </Router>
            </div>
        );
    }
}