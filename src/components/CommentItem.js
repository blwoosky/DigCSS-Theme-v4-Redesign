import React, { Component } from 'react';
import moment from 'moment';

import CommentFormContainer from "./../containers/CommentFormContainer";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class CommentsItem extends Component {

    constructor(props) {
        super(props);
        this.getChildComment = this.getChildComment.bind(this);
    }

    createMarkup(html) {

        return {
            __html: html
        };

    }


    getChildComment(comment, comments) {

        let _this = this;

        return (
            comments.map(function (childComment) {
                if (childComment.parent == comment.id) {
                    return (
                        <div key={childComment.id} className="childComments">
                            {_this.props.getComment(childComment, comments, false)}
                        </div>
                    )
                }
            })
        )
    }


    render() {

        let _this = this;
        let {comments,comment,setReplyState,isReply,newComments,canReply,activeReply,setActiveReply} = this.props;
        //console.log(isNewComment, canReply);

        return (
            <div className="commentItem mb10 rel">
                <div className="moduleBox">
                    <div className="p15">
                        {(()=> {
                            if (comment.status == 'hold') {
                                return (
                                    <div className="abs tipTxt">
                                        您的留言已提交,请等待审核.
                                    </div>
                                )
                            }

                        })()}
                        <div className="fix rel">

                            {(()=> {
                                if (canReply) {
                                    if (!isReply) {
                                        return (
                                            <div className="btns abs">
                                                <a className="btn"
                                                   onClick={()=>setActiveReply(comment.id)}>回复</a>
                                            </div>
                                        )
                                    }
                                }

                            })()}


                            <div className="l gravatar mr20">
                                <img src={comment.author_avatar_urls["96"] } alt=""/>
                            </div>

                            <div className="cell">

                                <div className="authorMeta">
                                    <a href={comment.author_url?comment.author_url:"javascript:;"}
                                       className="authorName">
                                        {comment.author_name}
                                    </a>
                                    <div className="commentsDate">
                                        { moment(comment.date).format("YYYY - MM - DD") }
                                    </div>
                                </div>

                                <div className="commentContent"
                                     dangerouslySetInnerHTML={this.createMarkup(comment.content.rendered)}></div>

                            </div>
                        </div>


                        <ReactCSSTransitionGroup transitionName="slideTop" transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={300}>
                            {(()=> {
                                //console.log(this.props);
                                //console.log(this.props.replyParentID);
                                if (activeReply == comment.id) {
                                    //console.log(this.props.replyParentID);
                                    //console.log(comment.id);
                                    return (
                                        <div className="respondBox mt10" key={comment.id}>
                                            <div className="mb10 tar">
                                                <a className="btn" onClick={()=>setActiveReply(-1)}>取消回复</a>
                                            </div>
                                            <CommentFormContainer
                                                formKey={comment.id.toString()}
                                                {...this.props}
                                                initialValues={ {parent:comment.id,post:this.props.postID} }/>
                                        </div>
                                    )
                                }
                            })()}
                        </ReactCSSTransitionGroup>

                        <ReactCSSTransitionGroup transitionName="slideTop" transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={300}>

                            {newComments.map(function (newComment) {
                                if (newComment.parent == comment.id && newComment.post == _this.props.postID) {

                                    return (
                                        <div
                                            className={ newComment.status == 'hold' ? 'newCommentItem hold mt20':'mt20 newCommentItem' }
                                            key={newComment.id}>
                                            {_this.props.getComment(newComment, [], false)}
                                        </div>
                                    )

                                }
                            })}

                        </ReactCSSTransitionGroup>


                        {this.getChildComment(comment, comments)}

                    </div>
                </div>
            </div>
        )
    }
}
