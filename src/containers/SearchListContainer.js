import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import { connect } from "react-redux";
import { search } from "./../actions";
import SearchList from "./../components/SearchList";
import { animateScroll } from 'react-scroll';


class SearchListContainer extends Component {

    constructor(props) {
        super(props);
        this.getPageParam = this.getPageParam.bind(this);
        this.getKeyWord = this.getKeyWord.bind(this);
    }

    getPageParam() {

        //console.log(this);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    getKeyWord() {
        let keyword = this.props.params.keyword;
        return typeof keyword == "undefined" ? "" : keyword;
    }

    componentWillMount() {

        this.props.search({
            s: this.getKeyWord()
        });

        this.props.updateTitle(`"${this.getKeyWord()}"的搜索结果`);

        this.props.updateLoadingState(true);

        animateScroll.scrollToTop();

    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(nextProps) {

        let isLoading = this.props.isLoading(nextProps.allStatus.list);
        this.props.updateLoadingState(isLoading);

        let prevKeyWord = this.getKeyWord(),
            nextKeyWord = nextProps.params.keyword;

        nextKeyWord = typeof nextKeyWord == "undefined" ? "" : nextKeyWord;

        if (prevKeyWord != nextKeyWord) {

            this.props.updateTitle(`"${nextKeyWord}"的搜索结果`);

            this.props.search({
                s: nextKeyWord
            });

            animateScroll.scrollToTop();

        }


    }


    render() {
        return (
            <SearchList {...this} {...this.props} />
        );

    }

}

function mapStateToProps(store) {
    return {
        list: store.search.searchList,
        allStatus: {
            list: store.search.status
        }
    };
}

export default connect(mapStateToProps, {search})(SearchListContainer);
