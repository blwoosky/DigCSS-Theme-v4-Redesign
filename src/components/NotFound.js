import React, { Component } from 'react';

export default class NotFound extends Component {

    componentWillMount() {
        this.props.updateLoadingState(false);
        this.props.updateTitle("404 Not Found.");
    }


    render() {
        return (
            <div className="NotFoundPage">
                <h1 className="postTitle tac mt30">
                    真是不好意思 <br/>
                    没找到您要的东西......
                </h1>
            </div>
        );
    }
}
