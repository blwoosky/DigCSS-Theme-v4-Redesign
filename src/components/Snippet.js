import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import CommentsContainer from './../containers/CommentsContainer';
import { Element,scroller } from "react-scroll";

import Prism from "../js/prism";
import moment from 'moment';

export default class Snippet extends Component {

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


        this.props.getSnippet({
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
        let {snippet} = this.props;
        //console.log(video);
        return (
            <div className="singlePost">
                <h1 className="postTitle tac" dangerouslySetInnerHTML={_this.createMarkup(snippet.title.rendered)}/>
                <div className="postMeta mt20">
                    <div>
                        上次更新时间 : { moment(snippet.modified).format("YYYY - MM - DD") }
                    </div>
                    <div className="commentsNo">
                        <Link to={`/snippets/${snippet.slug}/comments`} onClick={_this.scrollToComments}>
                            <svg viewBox="0 0 100 100">
                                <use xlinkHref="#icon-bubbles2"></use>
                            </svg>
                            { snippet.commentsNo }
                        </Link>
                    </div>
                </div>
                <div className="postContent moduleBox">
                    <div className="p15">
                        <div dangerouslySetInnerHTML={_this.createMarkup(snippet.content.rendered)}>
                        </div>
                    </div>

                </div>
                <Element name="commentsTop"/>
                <div className="tac commentsStart mt30">
                    [<span dangerouslySetInnerHTML={_this.createMarkup(snippet.title.rendered)}/>]
                    上的 { snippet.commentsNo }条评论
                </div>
                <div className="comments mt30 mb30">
                    <CommentsContainer postID={snippet.id} commentStatus={snippet.comment_status}
                                       postType="snippets" {...this.props}/>
                </div>
            </div>

        );
    }
}

