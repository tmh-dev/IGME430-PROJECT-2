import * as React from 'react';
import axios from 'axios';
import { stringify } from 'query-string';
import { Route, Redirect } from 'react-router-dom';

export interface IProps {
    _csrf: string;
}

export interface IState {
    email: string;
    password: string;
}

export default class Login extends React.Component<IProps, IState> {
    state: IState = {
        email: '',
        password: '',
    };

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({ email: e.target.value });
                break;
            case 'inputPassword':
                this.setState({ password: e.target.value });
                break;
        }
    }

    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        const { email, password } = this.state;
        const { _csrf } = this.props;
        
        if (!email || !password) {
            console.log("All fields are required");
        }

        const data = {
            email,
            password,
            _csrf,
        };

        try {
            const response = await axios({
                method: 'post',
                url: '/api/login',
                data: stringify(data),
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                },
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    public render() {
        const { _csrf } = this.props;
        const { email, password } = this.state;

        return (
            <div className="container">

 
                    <form onSubmit={ this.handleFormSubmit }>
                        <h3 className="text-center">Login</h3>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" 
                            placeholder="Enter email" onChange={ this.handleOnChange } value={ email }/>          
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
                            onChange={ this.handleOnChange } value={ password } />
                        </div>
                        <input type="hidden" name="_csrf" value={ _csrf }/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

            </div>
        );
    }
}