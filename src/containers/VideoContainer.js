import React, { Component } from 'react';
import Video from "./../components/Video";

import { connect } from "react-redux";
import { getVideo } from "./../actions";
import { Link,browserHistory } from 'react-router';
import { animateScroll } from 'react-scroll';


class VideoContainer extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {

        this.props.updateLoadingState(true);
        animateScroll.scrollToTop();

    }


    componentDidUpdate() {


    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.video.id == -1 && nextProps.allStatus.video == "success") {
            browserHistory.push(`/404`);
        }

        let isLoading = this.props.isLoading(nextProps.allStatus.video);
        this.props.updateLoadingState(isLoading);
        if (nextProps.allStatus.video == "success") {
            this.props.updateTitle(`${nextProps.video.title.rendered}`);
        }


    }

    render() {

        return (
            <Video {...this.props}/>
        );

    }
}


function mapStateToProps(store) {
    return {
        video: store.videos.currentVideo.data,
        allStatus: {
            video: store.videos.currentVideo.status
        }

    };
}

export default connect(mapStateToProps, {getVideo})(VideoContainer);