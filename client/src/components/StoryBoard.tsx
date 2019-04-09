import * as React from "react";
import axios from 'axios';
//axios.defaults.baseURL = "http://localhost:8080";
import { stringify } from "query-string";
import StoryForm from "./StoryForm";
//import BoardCategory from "./BoardCategory";
import Story from './Story';


export interface IState {
    stories: any[]
}

export default class StoryBoard extends React.Component<{}, IState> {
    state: IState = {
        stories: [],
    };

    componentDidMount() {
        this.getStories();
    }

    // componentDidUpdate() {
    //     this.getStories();
    // }

    private getStories = async (): Promise<any> => {
        try {
            const response = await axios({
                method: 'get',
                url: '/api/getStories',
                headers: {
                    'Accept':'application/json'
                }
            });
            this.setState({stories: response.data.stories});
        } catch (err) {
            console.log(err);
        }
    }

    private deleteStory = async (): Promise<any> => {
        try {
            const response = await axios.delete('/api/deleteStory');
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    private handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    private handleDrop = (e: React.DragEvent) => {
        let id = e.dataTransfer.getData("text");
        console.log(id)
    }

    private displayStories = () => {
        console.log('test');
        const { stories } = this.state;
        let jsxStories: any[] | JSX.Element[] = [];
        console.log(stories.length);
        stories.forEach(story => {
            jsxStories.push(<Story title={story.title} status={"working"} description={story.description}/>);
            console.log(story.title);
        })

        return jsxStories;
    }

    private createGroup = () => {
        const { stories } = this.state;
        // if no cards are passed down
        if (stories.length <= 0) {
            return <div>No Stories Made</div>;
        }

        let group: any = [];
        let numRows: number = Math.ceil(stories.length / 4);

        // outer loop to create rows
        for (let i: number = 0; i < numRows; i++) {
            let cols = [];
            // inner loop to create cols 
            for (let j: number = 0; stories.length > 0 && i < 4; j++) {
                const { title, description } = stories.shift();
                cols.push(<Story title={title} status="In Progress" description={description} />);
            }
            // create row and add cols
            group.push(<div className="row">{ cols }</div>);
        }
        
        return group;
    }

    public render() {
        const { stories } = this.state;

        return (
            <div className="container">
                <div className="row">
                    {/* <BoardCategory title="ICE BOX" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} stories={stories} />
                    <BoardCategory title="EMERGENCY" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} stories={stories} />
                    <BoardCategory title="IN PROGRESS" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop}/>
                    <BoardCategory title="TESTING" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop}/>
                    <BoardCategory title="COMPLETE" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop}/> */}
                </div>
                <StoryForm />
                {this.createGroup()}
            </div>
        );
    }
}