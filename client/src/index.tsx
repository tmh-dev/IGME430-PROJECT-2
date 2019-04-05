import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';

// import stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './stylesheets/main.scss';

ReactDOM.render(<App />, document.querySelector("#root"));