import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import moment from 'moment';
import ReactPaginate from 'react-paginate';


export default class CourseList extends Component {

    constructor(props) {
        //console.log(props);
        super(props);
    }

    createMarkup(html) {

        return {
            __html: html
        };

    }


    renderItem(course) {

        var _this = this;
        return (
            <div key={course.id} className="courseItem rel moduleBox">
                <div className="p15">
                    <div className="courseName abs tac">
                        <h2>
                            <Link to={`/courses/${course.slug}`}
                                  dangerouslySetInnerHTML={_this.createMarkup(course.title.rendered)}/>
                        </h2>
                    </div>
                    <div className="courseCoverImg">
                        <img src={course.acf.cover_img} alt={course.title.rendered}/>
                    </div>
                    <div className="courseIntro"
                         dangerouslySetInnerHTML={_this.createMarkup(course.acf.course_intro)}></div>
                    <div className="mt10 tar">
                        <Link to={`/courses/${course.slug}`} className="btn">查看详情&gt;&gt;</Link>
                    </div>
                </div>
            </div>
        )
    }


    render() {

        const { totalPages,getPageParam, courseList } = this.props;
        let pageParam = getPageParam();
        pageParam = pageParam == null ? 1 : pageParam;

        let _this = this;

        //console.log(videosList);

        return (

            <div className="courseList">


                {courseList.map(function (course) {
                    return _this.renderItem(course);
                })}

                {(()=> {
                    if (totalPages > 1) {

                        return (
                            <div className="mt30 tac mb10">

                                <ReactPaginate previousLabel={"上一页"}
                                               nextLabel={"下一页"}
                                               breakLabel={"..."}
                                               pageNum={totalPages}
                                               marginPagesDisplayed={3}
                                               pageRangeDisplayed={4}
                                               clickCallback={this.props.handlePageClick}
                                               containerClassName={"pagination"}
                                               subContainerClassName={"pages pagination"}
                                               activeClassName={"active"}
                                               forceSelected={pageParam-1}/>

                            </div>
                        )
                    }
                })()}
            </div>
        );
    }
}

