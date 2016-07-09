import React, { Component } from 'react';
import CourseList from "./../components/CourseList";
import { Link,browserHistory } from 'react-router';

import { connect } from "react-redux";
import { getCoursesPage,getCourses } from "./../actions";
import { animateScroll } from 'react-scroll';


class CourseListContainer extends Component {

    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.getPageParam = this.getPageParam.bind(this);
        this.initPage = true;

    }


    getPageParam() {

        //console.log(this);
        let pageParam = parseInt(this.props.params.pageNum);
        return isNaN(pageParam) ? 1 : pageParam;

    }


    handlePageClick(selected) {

        let pageNow = selected.selected + 1;

        //this.props.getPosts(pageNow);
        //将点击动作添加到路由 & 历史管理

        browserHistory.push(`/courses/page/${pageNow}`);
    }

    componentWillMount() {

        animateScroll.scrollToTop();

        this.props.getCoursesPage();

        this.props.updateTitle(`视频课程`);

        this.props.updateLoadingState(true);


    }


    componentDidUpdate() {



    }


    componentWillReceiveProps(nextProps) {

        let isLoadingList = this.props.isLoading(nextProps.allStatus.courseList);
        this.props.updateLoadingState(isLoadingList);

        let prevPageNum = this.getPageParam(),
            nextPageNum = parseInt(nextProps.params.pageNum);

        nextPageNum = isNaN(nextPageNum) ? 1 : nextPageNum;

        let coursePageID = nextProps.coursePage.id;
        //console.log(coursePageID);

        //console.log(prevPageNum, nextPageNum);
        //console.log(prevCategory, nextCategory);

        if (coursePageID != -1 && ((nextPageNum != prevPageNum) || (nextPageNum == prevPageNum && this.initPage) )) {

            this.initPage = false;

            this.props.getCourses({
                parent: coursePageID,
                page: nextPageNum
            });

            animateScroll.scrollToTop();

        }


    }

    render() {
        return (
            <CourseList {...this} {...this.props} />
        );

    }

}

function mapStateToProps(store) {
    return {
        coursePage: store.courses.coursePage.data,
        totalPages: store.courses.courseList.totalPages,
        courseList: store.courses.courseList.courses,
        allStatus: {
            coursePage: store.courses.coursePage.status,
            courseList: store.courses.courseList.status
        }
    };
}

export default connect(mapStateToProps, {getCoursesPage, getCourses})(CourseListContainer);