import React, { Component } from 'react';
import CommentItem from "./../components/CommentItem";
const COMMENT_DEPTH = 3;

export default class CommentsItemContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canReply: props.canReply
        };

    }

    componentWillReceiveProps() {

    }

    componentDidUpdate() {


    }


    render() {
        return (
            <CommentItem canReply={this.state.canReply} isReply={this.state.isReply} {...this} {...this.props}/>
        )
    }


}