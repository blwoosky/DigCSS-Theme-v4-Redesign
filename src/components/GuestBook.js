import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router'

import CommentsContainer from './../containers/CommentsContainer';
import { Element } from "react-scroll";

export default class GuestBook extends Component {

    constructor(props) {
        super(props);
    }

    createMarkup(html) {

        return {
            __html: html
        };

    }

    componentWillMount() {

        this.props.getGuestBook();

    }

    render() {

        let {guestbook} = this.props;
        return (
            <div className="guestBookPage">
                <h1 className="postTitle tac">
                    留个言呗\^_^/
                </h1>
                <div className="comments mb30">
                    <CommentsContainer postID={guestbook.id} commentStatus={guestbook.comment_status} postType="guestBook" {...this.props}/>
                </div>
            </div>
        );

    }
}

