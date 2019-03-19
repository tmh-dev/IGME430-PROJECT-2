import React, { Component } from 'react';

class Signup extends Component {
    state = {
        email: '',
        password1: '',
        password2: '',
    }

    handleOnChange = e => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({email: e.target.value});
                break;
            case 'inputPassword1':
                this.setState({password1: e.target.value});
                break;
            case 'inputPassword2':
                this.setState({password2: e.target.value});
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
                    <h3 className="text-center">Signup</h3>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleOnChange} value={this.state.email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>             
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" placeholder="Password" onChange={this.handleOnChange} value={this.state.password1} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword2">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword2" placeholder="Confirm Password" onChange={this.handleOnChange} value={this.state.password2} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        );
    }
}

export default Signup;