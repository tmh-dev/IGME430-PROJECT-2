import * as React from 'react';

export interface IProps {
    //_id: string;
    title: string;
    description: string;
}

export default class Story extends React.Component<IProps> {
    private handleDragStart = (e: React.DragEvent) => {
        e.preventDefault();
        console.log("drag started")
        //e.dataTransfer.setData("text", this.props._id);
    }

    public render() {
        const { title, description } = this.props;

        return (
            <div className="container" draggable onDragStart={this.handleDragStart}>
                <h3>{title}</h3>
                <p className="lead">{description}</p>
            </div>
        );
    }
}

