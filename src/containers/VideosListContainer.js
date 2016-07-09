import React, { Component } from 'react';
import VideosList from "./../components/VideosList";
import { Link,browserHistory } from 'react-router';

import { connect } from "react-redux";
import { getVideos } from "./../actions";
import { animateScroll } from 'react-scroll';


class VideosListContainer extends Component {

    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getPageParam = this.getPageParam.bind(this);
    }


    getPageParam() {

        //console.log(this);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    handlePageClick(selected) {

        let pageNow = selected.selected + 1;

        //this.props.getVideos(pageNow);
        //将点击动作添加到路由 & 历史管理

        browserHistory.push(`/videos/page/${pageNow}`);
    }

    componentDidMount() {

        animateScroll.scrollToTop();

        let pageParam = this.getPageParam();

        this.props.getVideos({
            page: pageParam
        });

        this.props.updateTitle("视频");
        //console.log("got it 111111");

        this.props.updateLoadingState(true);
    }


    componentDidUpdate() {


    }

    componentWillReceiveProps(nextProps) {

        let isLoading = this.props.isLoading(nextProps.allStatus.videosList);
        this.props.updateLoadingState(isLoading);

        let prevPageNum = this.getPageParam(),
            nextPageNum = parseInt(nextProps.params.pageNum);

        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        //console.log(prevPageNum, nextPageNum);
        //console.log(prevCategory, nextCategory);

        if (nextPageNum != prevPageNum) {

            this.props.getVideos({
                page: nextPageNum
            });
            animateScroll.scrollToTop();

        }


    }

    render() {
        return (
            <VideosList {...this} {...this.props} />
        );

    }

}

function mapStateToProps(store) {
    return {
        videosList: store.videos.videosList.videos,
        totalPages: store.videos.videosList.totalPages,
        allStatus: {
            videosList: store.videos.videosList.status
        }
    };
}

export default connect(mapStateToProps, {getVideos})(VideosListContainer);