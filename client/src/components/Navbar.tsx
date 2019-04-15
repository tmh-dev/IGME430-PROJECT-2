import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../AuthContext';

export default class Navbar extends React.Component {
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
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Scrummy</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/storyboard">StoryBoard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-secondary my-2 my-sm-0" onClick={this.logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}