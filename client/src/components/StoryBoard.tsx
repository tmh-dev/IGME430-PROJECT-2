import * as React from "react";
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8080";
import { stringify } from "query-string";
import StoryForm from "./StoryForm";
//import BoardCategory from "./BoardCategory";
import Story from './Story';


export interface IState {
    stories: Object[]
}

export default class StoryBoard extends React.Component<{}, IState> {
    state: IState = {
        stories: [],
    };

    componentDidMount() {
        this.getStories();
    }

    componentDidUpdate() {
        this.getStories();
    }

    private getStories = async (): Promise<any> => {
        try {
            const response = await fetch("http://localhost:8080/api/getStories", {
                method: "GET",
                mode: "no-cors",

            });
            console.log(response);
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

    // private renderStories = () => {
    //     let reactStories: JSX.Element[] = [];

    //     this.state.stories.forEach(story => {
    //         reactStories.push(<Story title={story.title} description={story.description} />);
    //     });

    //     return reactStories;
    // }

    private handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    private handleDrop = (e: React.DragEvent) => {
        let id = e.dataTransfer.getData("text");
        console.log(id)
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
            </div>
        );
    }
}