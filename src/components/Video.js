import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
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
        this.props.getVideo({
            slug: slug
        });

    }


    componentDidUpdate() {
        //console.log("how many times");
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
        let {video} = this.props;
        //console.log(video);
        return (
            <div className="singleVideo">
                <h1 className="postTitle tac" dangerouslySetInnerHTML={_this.createMarkup(video.title.rendered)}/>
                <div className="videoBox" dangerouslySetInnerHTML={_this.createMarkup(video.acf.youku_src)}>
                </div>
                <div className="postMeta mt20">
                    <div>
                        播放时长: {video.acf.video_runtime}
                    </div>
                    <div className="postDate">
                        <b>{ moment(video.date).format("YYYY - MM - DD") } </b>
                    </div>
                    <div className="commentsNo">
                        <Link to={`/videos/${video.slug}/comments`} onClick={_this.scrollToComments}>
                            <svg viewBox="0 0 100 100">
                                <use xlinkHref="#icon-bubbles2"></use>
                            </svg>
                            { video.commentsNo }
                        </Link>
                    </div>
                </div>
                <div className="postContent moduleBox">
                    <div className="p15">
                        <div dangerouslySetInnerHTML={_this.createMarkup(video.content.rendered)}>
                        </div>
                        <div className="mt10 tar">
                            如果讨厌广告,可以: <a className="btn" target="_blank" href={video.acf.video_dlink}>下载高清视频</a>
                        </div>
                    </div>

                </div>
                <Element name="commentsTop"/>
                <div className="tac commentsStart mt30">
                    [<span dangerouslySetInnerHTML={_this.createMarkup(video.title.rendered)}/>] 上的 { video.commentsNo }条评论
                </div>
                <div className="comments mt30 mb30">
                    <CommentsContainer postID={video.id} commentStatus={video.comment_status} postType="videos" {...this.props}/>
                </div>
            </div>

        );
    }
}

