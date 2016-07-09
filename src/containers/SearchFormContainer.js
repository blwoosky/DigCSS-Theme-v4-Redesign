import React, { Component } from 'react';
import SearchForm from "./../components/SearchForm";
import { Link,browserHistory } from 'react-router';
import { connect } from "react-redux";
import { search } from "./../actions";

export default class SearchFormContainer extends Component {

    constructor(props) {

        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            keyword: ""
        }

    }


    onInputChange(e) {

        this.setState({
            keyword: e.target.value
        });

        //console.log(this.state.keyword);

    }

    onSearch(e) {
        e.preventDefault();
        this.props.setOpened(false);
        this.setState({
            keyword: ""
        });
        browserHistory.push(`/search/${this.state.keyword}`);

    }

    render() {
        return (
            <SearchForm keyword={this.state.keyword} {...this.props} {...this}/>
        )
    }
}


//function mapStateToProps(store) {
//    return {
//        list: store.search.list,
//        pageNum: store.search.pageNum,
//        totalPages: store.search.totalPages
//    };
//}

export default connect(null, {search})(SearchFormContainer);
