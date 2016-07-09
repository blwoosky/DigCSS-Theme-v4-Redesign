import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import ReactPaginate from 'react-paginate';

import CommentFormContainer from "./../containers/CommentFormContainer";
import CommentItemContainer from "./../containers/CommentItemContainer";
import Loader from './Loader';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


export default class Comments extends Component {

    constructor(props) {
        super(props);
        this.getComment = this.getComment.bind(this);
    }


    getComment(comment, comments, canReply) {
        //console.log(comment);

        return (
            <CommentItemContainer key={comment.id}
                                  comment={comment}
                                  canReply={canReply}
                                  comments={comments} {...this} {...this.props}/>
        )

    }


    render() {

        let {comments,activeReply,totalPages,newComments,isLoadingComments,commentStatus} = this.props,
            _this = this;
        let pageParam = this.props.getPageParam();
        pageParam = pageParam == null ? 1 : pageParam;

        return (

            <div className="commentsWrap">
                <div
                    className={isLoadingComments ? 'loadingBox loadingComments isLoading':'loadingBox loadingComments'}>
                    <div className="loadingContent">

                        {comments.map(function (comment) {
                            //console.log(comment);
                            if (comment.parent == 0) {
                                return _this.getComment(comment, comments, commentStatus == "open");
                            }

                        })}
                    </div>
                    {
                        (()=> {
                            if (isLoadingComments) {
                                return <Loader/>
                            }
                        })()
                    }
                </div>
                <ReactCSSTransitionGroup transitionName="slideTop" transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}>
                    {newComments.map(function (newComment) {
                        //console.log(newComment,this.props.postID);

                        if (newComment.parent == 0 && newComment.post == _this.props.postID) {
                            return (
                                <div className={ newComment.status == 'hold' ? 'newCommentItem hold':'newCommentItem' }
                                     key={newComment.id}>
                                    { _this.getComment(newComment, [], false) }
                                </div>
                            )
                        }
                    })}
                </ReactCSSTransitionGroup>

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

                <ReactCSSTransitionGroup transitionName="opacity" transitionEnterTimeout={500}
                                         transitionLeaveTimeout={300}>
                    {(()=> {
                        if (activeReply == -1 && commentStatus == "open") {
                            return (
                                <div className="mt30" key={-1}>
                                    <CommentFormContainer
                                        formKey={"0"}
                                        initialValues={ {parent:0,post:this.props.postID} } {...this.props}/>
                                </div>
                            )
                        }
                    })()}
                </ReactCSSTransitionGroup>

            </div>

        )

    }
}


