import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import {createComment} from './../actions'
import Loader from './Loader';

export default class CommentForm extends Component {


    render() {

        //console.log(this.props);
        const {fields: {author_name,author_email,author_url,content},isLoading,errState,setErrState,errMsg, handleSubmit} = this.props;
        return (
            <div className={isLoading ? 'loadingBox isLoading':'loadingBox'}>
                {(()=> {
                    if (errState) {
                        return (
                            <div className="errMsg tac mb5 rel">
                                {errMsg}
                                <svg viewBox="0 0 100 100" className="closeBtn abs"
                                     onMouseEnter={()=>{setErrState(false)}}>
                                    <use xlinkHref="#icon-cross"></use>
                                </svg>
                            </div>
                        )
                    }
                })()}

                <div className="loadingContent">
                    <form className="commentForm" onSubmit={handleSubmit(this.props.onSubmit)}>

                        <div className="fix mainWrap inputs">
                            <div className="col-1-3 l">
                                <input type="text" className="form-control" required placeholder="昵称(*必填)" {...author_name}/>
                            </div>
                            <div className="col-1-3 l">
                                <input type="email" className="form-control" required
                                       placeholder="Email(*必填)" {...author_email}/>
                            </div>
                            <div className="col-1-3 l">
                                <input type="url" className="form-control" placeholder="网站" {...author_url}/>
                            </div>
                        </div>
                        <div className="text_content mt10">
                    <textarea required className="form-control" placeholder="留言内容(*必填)" {...content}>

                    </textarea>
                        </div>
                        <div className="tac mt10">
                            <button type="submit" className="submitBtn btn">提交留言</button>
                        </div>
                    </form>
                </div>
                {
                    (()=> {
                        if (isLoading) {
                            return <Loader/>
                        }
                    })()
                }

            </div>
        )
    }
}


