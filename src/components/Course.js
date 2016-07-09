import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import { Element,scroller } from "react-scroll";

import Prism from "../js/prism";

export default class Course extends Component {

    constructor(props) {
        super(props);
    }

    createMarkup(html) {

        return {
            __html: html
        };

    }

    componentDidMount() {

        let { slug } = this.props.params;


        this.props.getCourse({
            slug: slug
        });

        //console.log(slug);

    }

    componentDidUpdate() {
        Prism.highlightAll(false);
    }

    scrollToComments() {
        scroller.scrollTo('commentsTop', {
            duration: 600,
            delay: 100,
            smooth: true
        });
    }

    render() {

        let _this = this;
        let {course} = this.props;
        //console.log(video);
        return (
            <div className="singleCourse mb30">

                <div className="moduleBox rel">
                    <div className="p15">
                        <div className="courseName abs tac">
                            <h2>
                                <span dangerouslySetInnerHTML={_this.createMarkup(course.title.rendered)}/>
                            </h2>
                        </div>
                        <div className="courseCoverImg">
                            <img src={course.acf.cover_img} alt={course.title.rendered}/>
                        </div>
                        <div className="mt20 mb20 fix courseTable tac">

                            <div className="tableLeft l">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>
                                            <span>发布时间</span>
                                        </th>
                                        <th>
                                            <span>价格</span>
                                        </th>
                                        <th>
                                            <span>课时</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span>
                                                {course.acf.pubdate}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="price">
                                                {course.acf.price}￥
                                            </span>
                                        </td>
                                        <td>
                                            <span>
                                                {course.acf.class_hours}
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="tableRight r">
                                <table>
                                    <thead>
                                    <tr>
                                        <th colSpan="2">
                                            <span>学习平台</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <span className="course_link">
                                                <a href={course.acf.link_study163} title="网易云课堂" target="_blank">
                                                    <svg viewBox="0 0 100 100">
                                                        <use xlinkHref="#icon-study163"></use>
                                                    </svg>
                                                    <b>网易云课堂</b>
                                                </a>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="course_link">
                                                <a href={course.acf.link_taobao} title="淘宝教育" target="_blank">
                                                    <svg viewBox="0 0 100 100">
                                                        <use xlinkHref="#icon-taobao"></use>
                                                    </svg>
                                                    <b>淘宝教育</b>
                                                </a>
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="courseContent postContent mt20"
                             dangerouslySetInnerHTML={_this.createMarkup(course.content.rendered)}></div>

                    </div>
                </div>
            </div>

        );
    }
}

