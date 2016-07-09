import React, { Component } from 'react';
import { connect } from "react-redux";
import { getComments } from "./../actions";
import { Link,browserHistory } from 'react-router';
import Comments from './../components/Comments';
import { Element,scroller } from "react-scroll";


class CommentsContainer extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.setActiveReply = this.setActiveReply.bind(this);
        this.getPageParam = this.getPageParam.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.scrollToComments = this.scrollToComments.bind(this);

        this.initPage = true;
        this.state = {
            activeReply: -1,
            isLoadingComments: true,
            isLoadingNewComments: true
        };
        //this.getChildComment = this.getChildComment.bind(this);

    }

    scrollToComments() {
        let reg = /\/comments/ig;
        if (reg.test(this.props.location.pathname)) {

            scroller.scrollTo('commentsTop', {
                duration: 600,
                delay: 100,
                smooth: true
            });

        }
    }

    isLoading(status) {
        return status != 'success';
    }


    componentWillReceiveProps(nextProps) {

        //console.log(nextProps.mainLoadingStatus);
        let { postID : prevPostID } = this.props,
            { postID : nextPostID } = nextProps;

        let prevPageNum = this.getPageParam(),
            nextPageNum = parseInt(nextProps.params.pageNum);
        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        //console.log(prevPostID, nextPostID);
        //console.log(prevPageNum, nextPageNum);

        let isLoadingComments = this.isLoading(nextProps.allStatus.comments),
            isLoadingNewComments = this.isLoading((nextProps.allStatus.newComments));

        this.setState({
            isLoadingComments,
            isLoadingNewComments
        });

        //console.log(nextPageNum);
        if (nextPostID != prevPostID) {
            this.initPage = true;
        }

        if (nextPostID != -1 && (prevPageNum != nextPageNum || prevPageNum == nextPageNum && this.initPage)) {
            //console.log(postID,nextPageNum,prevPageNum);

            this.initPage = false;

            this.props.getComments({
                post: nextPostID,
                page: nextPageNum
            });

            if (!this.state.mainLoadingStatus) {
                this.scrollToComments();
            }

        }

    }

    getPageParam() {

        //console.log(this.props);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    handlePageClick(selected) {

        let pageNow = selected.selected + 1,
            postTypeSlug = "/";

        //this.props.getPosts(pageNow);
        //将点击动作添加到路由 & 历史管理
        //console.log(this.props);

        switch (this.props.postType) {
            case "videos":
                postTypeSlug = "/videos/";
                break;
            case "snippets":
                postTypeSlug = "/snippets/";

        }

        if ("guestBook" == this.props.postType) {
            browserHistory.push(`/guestbook/${pageNow}`);
            return;
        }

        browserHistory.push(`${postTypeSlug + this.props.params.slug}/comments/${pageNow}`);

    }


    setActiveReply(id) {
        this.setState({
            activeReply: id
        });
    }


    render() {
        return (
            <Comments {...this.props} {...this} {...this.state}/>
        )
    }


}


function mapStateToProps(store) {
    //console.log(store.comments);

    return {
        comments: store.comments.allComments.comments,
        pageNum: store.comments.allComments.pageNum,
        totalPages: store.comments.allComments.totalPages,
        newComments: store.comments.newComments.data,
        allStatus: {
            comments: store.comments.allComments.status,
            newComments: store.comments.newComments.status
        }
    };

}

export default connect(mapStateToProps, {getComments})(CommentsContainer);


