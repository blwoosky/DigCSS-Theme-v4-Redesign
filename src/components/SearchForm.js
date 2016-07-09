import React, { Component } from 'react';

export default class SearchForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let _this = this;
        return (
            <div className="r searchForm rel">
                <form onSubmit={this.props.onSearch}>

                    <button className="searchBtn">
                        <svg viewBox="0 0 100 100">
                            <use xlinkHref="#icon-search">

                            </use>
                        </svg>
                    </button>

                    <input
                        type="text"
                        className="abs"
                        required
                        value={_this.props.keyword}
                        onChange={this.props.onInputChange}
                        placeholder="在此输入搜索关键字"/>

                </form>
            </div>
        )
    }
}