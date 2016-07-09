import React, { Component } from 'react';
import Post from "./../components/Post";

import { connect } from "react-redux";
import { getPost } from "./../actions";
import { animateScroll } from 'react-scroll';
import { Link,browserHistory } from 'react-router';


class PostContainer extends Component {

    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps) {

        //console.log(nextProps.allStatus.post);
        if (nextProps.post.id == -1 && nextProps.allStatus.post == "success") {
            browserHistory.push(`/404`);
        }

        if (nextProps.allStatus.post == "success") {
            this.props.updateTitle(`${nextProps.post.title.rendered}`);
        }

        let isLoading = this.props.isLoading(nextProps.allStatus.post);
        this.props.updateLoadingState(isLoading);

    }

    componentWillMount() {

        animateScroll.scrollToTop();

        this.props.updateLoadingState(true);

    }

    componentDidUpdate() {

    }

    render() {

        return (
            <Post {...this.props}/>
        );

    }
}


function mapStateToProps(store) {
    return {
        post: store.post.data,
        allStatus: {
            post: store.post.status
        }
    };
}

export default connect(mapStateToProps, {getPost})(PostContainer);