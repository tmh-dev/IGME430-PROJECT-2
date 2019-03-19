import * as React from 'react';

export interface IProps {
    csrf: string;
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

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({ email: e.target.value });
                break;
            case 'inputPassword':
                this.setState({ password: e.target.value });
                break;
        }
    }

    // TODO: Add coniditional rendering
    private handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = this.state;
        
        if (!email || !password) {
            console.log("All fields are required");
            return false;
        }

        sendAjax('/api/login', 'POST', { email, password });

        return false;
    }

    public render() {
        const { csrf } = this.props;
        const { email, password } = this.state;

        return (
            <div className="container">
                <form>
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
                </form>
                <input type="hidden" name="_csrf" value={ csrf }/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        );
    }
}