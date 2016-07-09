import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import {createComment} from './../actions'
import CommentForm from "./../components/CommentForm";


class CommentFormContainer extends Component {

    constructor(props) {

        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.setLoadingState = this.setLoadingState.bind(this);
        this.setErrState = this.setErrState.bind(this);

        this.state = {
            isLoading: false,
            errState: false
        };

    }

    isLoading(status) {
        return status != 'success';
    }

    setLoadingState(isLoading) {
        this.setState({
            isLoading
        });
    }

    setErrState(errState) {
        this.setState({
            errState
        });
    }

    componentWillReceiveProps(nextProps) {


        let prevStatus = this.props.allStatus.newComments,
            nextStatus = nextProps.allStatus.newComments;
        let prevErr = this.props.err,
            nextErr = nextProps.err;

        if (prevStatus != nextStatus) {
            this.setLoadingState(this.isLoading(nextProps.allStatus.newComments));
            if (nextErr && nextStatus == "failed") {

                this.setLoadingState(false);
                this.setErrState(true);
            }
        }


        //console.log(isLoading);


    }


    onSubmit(props) {

        this.props.createComment(props);
        this.props.resetForm();
        this.setLoadingState(true);
        this.props.setActiveReply(-1);

    }

    componentDidUpdate() {

        //console.log(this.props.err);

    }

    render() {
        //console.log(this.props);
        return <CommentForm {...this.props} {...this} {...this.state}/>
    }
}


function mapStateToProps(store) {
    //console.log(store.comments);

    return {
        newComments: store.comments.newComments.data,
        err: store.comments.newComments.err,
        errMsg: store.comments.newComments.errMsg,
        allStatus: {
            newComments: store.comments.newComments.status
        }
    };

}


CommentFormContainer = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'commentForm',                           // a unique name for this form
    fields: ['author_name', 'author_email', 'author_url', 'content', 'parent', 'post']
}, mapStateToProps, {createComment})(CommentFormContainer);

export default CommentFormContainer;