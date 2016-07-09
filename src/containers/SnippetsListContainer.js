import React, { Component } from 'react';
import SnippetsList from "./../components/SnippetsList";
import { Link,browserHistory } from 'react-router';

import { connect } from "react-redux";
import { getSnippets,getSnippetsTags,getSnippetsTotalCount } from "./../actions";
import { animateScroll } from 'react-scroll';


class SnippetsListContainer extends Component {

    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getPageParam = this.getPageParam.bind(this);
        this.getTagParam = this.getTagParam.bind(this);
        this.setSnippetsTagID = this.setSnippetsTagID.bind(this);
        this.initPage = true;

        this.state = {
            snippetsTagID: -1 //-1 means all tags
        };
    }

    getTagParam() {

        let tagParam = this.props.params.snippetsTag;
        return typeof tagParam == "undefined" ? "" : tagParam;
    }

    getPageParam() {

        //console.log(this);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    setSnippetsTagID(id, fn) {

        this.setState({
            snippetsTagID: id
        }, fn);

    }

    handlePageClick(selected) {

        let pageNow = selected.selected + 1;
        let tag = this.getTagParam();

        //this.props.getPosts(pageNow);
        //将点击动作添加到路由 & 历史管理

        if (tag) {
            browserHistory.push(`/snippets/tag/${tag}/page/${pageNow}`);
        } else {
            browserHistory.push(`/snippets/page/${pageNow}`);
        }
    }

    componentWillMount() {

        this.props.getSnippetsTags();
        this.props.getSnippetsTotalCount();

        this.props.updateTitle(`所有代码片段`);

        this.props.updateLoadingState(true);

    }


    componentDidUpdate() {

        //console.log(this.props.allStatus.videosList);


    }

    componentWillReceiveProps(nextProps) {

        let isLoading = this.props.isLoading(nextProps.allStatus.snippetsList);
        this.props.updateLoadingState(isLoading);

        let prevPageNum = this.getPageParam(),
            nextPageNum = parseInt(nextProps.params.pageNum);

        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        let prevTag = this.getTagParam(),
            nextTag = nextProps.params.snippetsTag;

        nextTag = typeof nextTag == "undefined" ? "" : nextTag;


        if ((nextPageNum != prevPageNum || nextTag != prevTag) ||
            ((nextTag == prevTag) && this.initPage)) {


            this.initPage = false;

            if (nextTag && nextProps.allStatus.snippetsTags == "success") {

                nextProps.snippetsTags.map((tag)=> {

                    if (nextTag == tag.slug) {

                        //console.log(tag);

                        this.props.updateTitle(`${tag.name}下代码片段`);
                        this.setSnippetsTagID(tag.id, ()=> {

                            this.props.getSnippets({
                                page: nextPageNum,
                                snippetstags: this.state.snippetsTagID
                            });
                        });

                    }
                });


            } else {

                this.props.updateTitle(`所有代码片段`);

                this.props.getSnippets({
                    page: nextPageNum
                });

            }

            animateScroll.scrollToTop();

        }


    }

    render() {
        return (
            <SnippetsList {...this} {...this.props} />
        );

    }

}

function mapStateToProps(store) {
    return {
        snippetsList: store.snippets.snippetsList.snippets,
        totalPages: store.snippets.snippetsList.totalPages,
        totalCount: store.snippets.totalCount.data,
        snippetsTags: store.snippets.snippetsTags.data,
        allStatus: {
            snippetsList: store.snippets.snippetsList.status,
            snippetsTags: store.snippets.snippetsTags.status,
            totalCount: store.snippets.totalCount.status
        }

    };
}

export default connect(mapStateToProps, {getSnippets, getSnippetsTags, getSnippetsTotalCount})(SnippetsListContainer);