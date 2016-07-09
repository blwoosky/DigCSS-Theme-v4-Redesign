import React, { Component } from 'react';
import Posts from "./../components/Posts";
import { Link,browserHistory } from 'react-router';

import { connect } from "react-redux";
import { getPosts } from "./../actions";
import { animateScroll } from 'react-scroll';


class PostsContainer extends Component {

    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getPageParam = this.getPageParam.bind(this);
        this.getCategoryParam = this.getCategoryParam.bind(this);
    }

    getPageParam() {

        //console.log(this);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    getCategoryParam() {

        let categoryParam = this.props.params.categorySlug;
        return typeof categoryParam == "undefined" ? "" : categoryParam;
    }

    handlePageClick(selected) {

        let pageNow = selected.selected + 1;
        let category = this.getCategoryParam();

        //this.props.getPosts(pageNow);
        //将点击动作添加到路由 & 历史管理

        if (category) {
            browserHistory.push(`/category/${category}/${pageNow}`);
        } else {
            browserHistory.push(`/page/${pageNow}`);
        }
    }

    componentWillMount() {

        animateScroll.scrollToTop();

        let pageParam = this.getPageParam(),
            categoryParam = this.getCategoryParam();

        this.props.getPosts({
            page: pageParam,
            category: categoryParam
        });

        //console.log(this.props.allStatus.posts);
        if (categoryParam) {
            this.props.updateTitle(`"${categoryParam}"下所有文章`);
        } else {
            this.props.updateTitle(`首页`);
        }

        this.props.updateLoadingState(true);

    }

    componentDidUpdate() {



    }

    componentWillReceiveProps(nextProps) {

        let isLoading = this.props.isLoading(nextProps.allStatus.posts);
        this.props.updateLoadingState(isLoading);
        //console.log(nextProps.allStatus.posts);
        //console.log(nextProps.allStatus.posts);
        let prevPageNum = this.getPageParam(),
            nextPageNum = parseInt(nextProps.params.pageNum);
        let prevCategory = this.getCategoryParam(),
            nextCategory = nextProps.params.categorySlug;

        nextCategory = typeof nextCategory == "undefined" ? "" : nextCategory;
        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        //console.log(prevPageNum, nextPageNum);
        //console.log(prevCategory, nextCategory);

        if (nextPageNum != prevPageNum || prevCategory != nextCategory) {

            this.props.getPosts({
                page: nextPageNum,
                category: nextCategory
            });
            animateScroll.scrollToTop();

            if (nextCategory) {
                this.props.updateTitle(`"${nextCategory}"下所有文章`);
            } else {
                this.props.updateTitle(`首页`);
            }

        }


    }

    render() {
        return (
            <Posts {...this} {...this.props} />
        );

    }

}

function mapStateToProps(store) {
    return {
        posts: store.posts.posts,
        totalPages: store.posts.totalPages,
        categories: store.categories.categoryList,
        allStatus: {
            posts: store.posts.status
        }
    };
}

export default connect(mapStateToProps, {getPosts})(PostsContainer);