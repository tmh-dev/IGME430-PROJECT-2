import * as React from 'react';
import axios from 'axios';
import { stringify, parse } from 'query-string';

export interface IProps {
    getToken: any;
}

export interface IState {
    email: string;
    password1: string;
    password2: string;
    _csrf: string;
}

export default class Signup extends React.Component<IProps, IState> {
    state: IState = {
        email: '',
        password1: '',
        password2: '',
        _csrf: '',
    };

    componentDidMount() {
        this.getToken();
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

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({ email: e.target.value });
                break;
            case 'inputPassword1':
                this.setState({ password1: e.target.value });
                break;
            case 'inputPassword2':
                this.setState({ password2: e.target.value });
                break;
        }
    }

    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();

        const { email, password1, password2 } = this.state;
        console.log(email);
    
        if (!email || !password1 || !password2) {
            console.log(`All fields required.`);
        }

        if (password1 !== password2) {
            console.log(`Passwords must match.`);
        }

        const data = {
            email,
            pass1: password1,
            pass2: password2,
        };
 
        try {
            axios({
                method: 'post',
                url: '/api/signup',
                data: stringify(data),
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
                },
            });
        } catch(err) {
            console.log(err.message);
        }
    }

    public render() {
        const { email, password1, password2, _csrf } = this.state;

        return (
            <div className="container">
                <form onSubmit={ this.handleFormSubmit }>
                    <h3 className="text-center">Signup</h3>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" 
                        placeholder="Enter email" onChange={this.handleOnChange} value={ email }/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>             
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" placeholder="Password" 
                        onChange={this.handleOnChange} value={ password1 } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword2">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword2" placeholder="Confirm Password" 
                        onChange={this.handleOnChange} value={ password2 } />
                    </div>
                    <input type="hidden" name="_csrf" value={ _csrf } />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form >
            </div>
        );
    }
}