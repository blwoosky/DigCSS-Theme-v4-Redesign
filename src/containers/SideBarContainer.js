import React, { Component } from 'react';
import SideBar from "./../components/SideBar";

import { connect } from "react-redux";
import { getLatestVideo,getCategories,getRecPosts } from "./../actions";

class SideBarContainer extends Component {

    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.state = {
            isLoadingVideos: true,
            isLoadingCategories: true,
            isLoadingRecPosts: true
        }
    }

    componentWillMount() {
        this.props.getLatestVideo();

        this.props.getCategories();
        this.props.getRecPosts({
            page: 1
        });

    }

    isLoading(status) {
        return status != 'success';
    }

    handlePageClick(selected) {

        let pageNow = selected.selected + 1;

        //console.log(pageNow);

        this.props.getRecPosts({
            page: pageNow
        });

    }

    componentWillReceiveProps(nextProps) {

        let isLoadingVideos = this.isLoading(nextProps.allStatus.latestVideo),
            isLoadingCategories = this.isLoading(nextProps.allStatus.categories),
            isLoadingRecPosts = this.isLoading(nextProps.allStatus.recPosts);


        this.setState({
            isLoadingVideos,
            isLoadingCategories,
            isLoadingRecPosts
        });

    }

    componentDidUpdate() {


    }

    render() {
        return (
            <SideBar {...this.props} {...this.state} {...this}/>
        );
    }
}


function mapStateToProps(store) {
    return {
        latestVideo: store.videos.latestVideo.data,
        categories: store.categories.categoryList,
        recPosts: store.recPosts,
        allStatus: {
            latestVideo: store.videos.latestVideo.status,
            categories: store.categories.status,
            recPosts: store.recPosts.status
        }
    };
}

export default connect(mapStateToProps, {getLatestVideo, getCategories, getRecPosts})(SideBarContainer);