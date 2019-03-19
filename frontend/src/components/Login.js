import React, { Component } from 'react';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleOnChange = e => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({email: e.target.value});
                break;
            case 'inputPassword':
                this.setState({password: e.target.value});
                break;
        }
    }

    handleFormSubmit = e => {
        e.preventDefault();

    }

    render() {
        return (
            <div className="container">
                <form>
                    <h3 className="text-center">Login</h3>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleOnChange} value={this.state.email}/>          
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.handleOnChange} value={this.state.password} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        );
    }
}

export default Login;