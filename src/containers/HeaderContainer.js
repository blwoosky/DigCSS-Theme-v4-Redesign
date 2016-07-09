import React, { Component } from 'react';
import Header from "./../components/Header";

//import { connect } from "react-redux";
//import {  } from "./../actions";

export default class HeaderContainer extends Component {

    constructor(props) {


        super(props);

        this.setOpened = this.setOpened.bind(this);
        this.getPath = this.getPath.bind(this);
        this.getPathForNav = this.getPathForNav.bind(this);

        this.state = {
            isOpened: false,
            navNow: ""
        };

    }

    getPath() {
        return this.props.location.pathname;
    }

    setOpened(isOpened) {
        this.setState({
            isOpened: isOpened
        });
    }

    getPathForNav(pathName) {
        if (/\/videos/.test(pathName)) return "videos";
        if (/\/snippets/.test(pathName)) return "snippets";
        if (/\/guestbook/.test(pathName)) return "guestbook";
        if (/\/courses/.test(pathName)) return "courses";
        return "";
    }

    componentDidMount() {

        let pathName = this.getPath();

        this.setState({
            navNow: this.getPathForNav(pathName)
        });

    }

    componentWillReceiveProps(nextProps) {

        let pathName = nextProps.location.pathname;
        this.setState({
            navNow: this.getPathForNav(pathName)
        });

    }

    render() {
        return (
            <Header isOpened={this.state.isOpened} navNow={this.state.navNow} {...this.props} {...this}/>
        )
    }

}

