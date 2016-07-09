import React, { Component } from 'react';
import GuestBook from "./../components/GuestBook";

import { connect } from "react-redux";
import { getGuestBook } from "./../actions";
import { animateScroll } from 'react-scroll';

class GuestBookContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {


        let isLoading = this.props.isLoading(nextProps.allStatus.guestbook);
        this.props.updateLoadingState(isLoading);

        let prevPageNum = this.getPageParam(),
            nextPageNum = nextProps.params.pageNum;

        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        if (nextPageNum != prevPageNum) {

            animateScroll.scrollToTop();

        }

    }


    getPageParam() {

        //console.log(this);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }

    componentWillMount() {

        animateScroll.scrollToTop();
        this.props.updateTitle(`留言板`);

        this.props.updateLoadingState(true);

    }

    componentDidUpdate() {

    }


    render() {

        return (
            <GuestBook {...this.props}/>
        );

    }
}


function mapStateToProps(store) {
    return {
        guestbook: store.guestbook.data,
        allStatus: {
            guestbook: store.guestbook.status
        }
    };
}

export default connect(mapStateToProps, {getGuestBook})(GuestBookContainer);