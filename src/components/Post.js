import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router'

import Category from './Category';
import CommentsContainer from './../containers/CommentsContainer';
import { Element,scroller } from "react-scroll";

import Prism from "../js/prism";
import moment from 'moment';

export default class Post extends Component {

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

        this.props.getPost({
            slug: slug
        });

        //console.log(this.props.postProp);

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
        let {post} = this.props;
        return (
            <div className="postPage">
                <h1 className="postTitle tac">
                    {post.title.rendered}
                </h1>
                <div className="postMeta">
                    <div className="postDate">
                        <b>{ moment(post.date).format("YYYY - MM - DD") } </b>
                    </div>
                    <div className="commentsNo">
                        <Link to={`/${post.slug}/comments`} onClick={_this.scrollToComments}>
                            <svg viewBox="0 0 100 100">
                                <use xlinkHref="#icon-bubbles2"></use>
                            </svg>
                            { post.commentsNo }
                        </Link>
                    </div>
                    <div className="tags">
                        <Category categories={post.cateGory}/>
                    </div>
                </div>
                <div className="postContent moduleBox">
                    <div className="p15"
                         dangerouslySetInnerHTML={_this.createMarkup(post.content.rendered)}>
                    </div>
                </div>
                <Element name="commentsTop"/>
                <div className="tac commentsStart mt30">
                    [<span dangerouslySetInnerHTML={_this.createMarkup(post.title.rendered)}/>] 上的 { post.commentsNo }条评论
                </div>
                <div className="comments mt30 mb30">
                    <CommentsContainer postID={post.id} commentStatus={post.comment_status} postType="post" {...this.props}/>
                </div>
            </div>
        );
    }
}

