import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import Course from "./../components/Course";

import { connect } from "react-redux";
import { getCourse } from "./../actions";
import { animateScroll } from 'react-scroll';


class CourseContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.course.id == -1 && nextProps.allStatus.course == "success") {
            browserHistory.push(`/404`);
        }

        if (nextProps.allStatus.course == "success") {
            this.props.updateTitle(`${nextProps.course.title.rendered}`);
        }

        let isLoadingList = this.props.isLoading(nextProps.allStatus.course);
        this.props.updateLoadingState(isLoadingList);

    }

    componentWillMount() {

        this.props.updateLoadingState(true);
        animateScroll.scrollToTop();

    }

    componentDidUpdate() {


    }

    render() {

        return (
            <Course {...this.props}/>
        );

    }
}


function mapStateToProps(store) {
    return {
        course: store.courses.course.data,
        allStatus: {
            course: store.courses.course.status
        }
    };
}

export default connect(mapStateToProps, {getCourse})(CourseContainer);