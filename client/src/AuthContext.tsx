import * as React from 'react';
import axios from 'axios';

const defaultValue = {
    isAuth: false, 
    login: () => console.log('login'), 
    logout: () => console.log('logout'),
};

const AuthContext = React.createContext(defaultValue);

class AuthProvider extends React.Component<{}> {
    state = {
        isAuth: false
    }

    constructor() {
        super({});
    }

    login = () => {
        this.setState({isAuth: true});
    }

    logout = async (): Promise<any> => {
        try {
            const response = await axios({
                method: 'get',
                url: '/api/logout',
                headers: {
                    'Accept':'application/json',
                },
            });
            console.log(response);
            this.setState({isAuth: false})
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <AuthContext.Provider 
                value={{ 
                    isAuth: this.state.isAuth,
                    login: this.login,
                    logout: this.logout,
                }}>
                
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };