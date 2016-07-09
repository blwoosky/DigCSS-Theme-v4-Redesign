import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import Snippet from "./../components/Snippet";

import { connect } from "react-redux";
import { getSnippet } from "./../actions";
import { animateScroll } from 'react-scroll';


class SnippetContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.snippet.id == -1 && nextProps.allStatus.snippet == "success") {
            browserHistory.push(`/404`);
        }

        let isLoading = this.props.isLoading(nextProps.allStatus.snippet);
        this.props.updateLoadingState(isLoading);

        if (nextProps.allStatus.snippet == "success") {
            this.props.updateTitle(`${nextProps.snippet.title.rendered}`);
        }


    }

    componentWillMount() {

        this.props.updateLoadingState(true);
        animateScroll.scrollToTop();
    }

    componentDidUpdate() {

    }


    render() {

        return (
            <Snippet {...this.props}/>
        );

    }
}


function mapStateToProps(store) {
    return {
        snippet: store.snippets.snippet.data,
        allStatus: {
            snippet: store.snippets.snippet.status
        }
    };
}

export default connect(mapStateToProps, {getSnippet})(SnippetContainer);