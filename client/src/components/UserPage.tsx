import * as React from 'react';
import BoardGroup from './BoardGroup';

const arr = [
    {title: "test", text: "test", link: "...", id: "test"},
    {title: "test", text: "test", link: "...", id: "test"},
    {title: "test", text: "test", link: "...", id: "test"},
    {title: "test", text: "test", link: "...", id: "test"},
    {title: "test", text: "test", link: "...", id: "test"},
];

export default class UserPage extends React.Component {
    render() {
        return (
            <div className="container">
                <h2>Boards:</h2>
                <BoardGroup title="main" cards={arr}/>
            </div>
        );
    }
}