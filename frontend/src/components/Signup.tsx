import * as React from 'react';

export interface IProps {
    csrf: string;
}

export interface IState {
    email: string;
    password1: string;
    password2: string;
}

export default class Signup extends React.Component<IProps, IState> {
    state: IState = {
        email: '',
        password1: '',
        password2: '',
    };

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

    private handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password1, password2 } = this.state;

        if (!email || !password1 || !password2) {
            console.log(`All fields required.`);
            return false;
        }

        if (password1 !== password2) {
            console.log(`Passwords must match.`);
            return false;
        }

        sendAjax('/api/signup', 'POST', { email, password1, password2});

        return false;
    }

    public render() {
        const { csrf } = this.props;
        const { email, password1, password2 } = this.state;

        return (
            <div className="container">
                <form>
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
                </form>
                <input type="hidden" name="_csrf" value={ csrf }/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        );
    }
}