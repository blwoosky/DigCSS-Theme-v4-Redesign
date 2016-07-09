import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import Category from './Category';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

export default class Posts extends Component {

    constructor(props) {
        //console.log(props);
        super(props);

    }

    createMarkup(html) {

        return {
            __html: html
        };

    }

    renderPostItem(post) {

        let _this = this;
        return (
            <div className="rel postItem mb10" key={post.id}>
                <div className="postMeta">
                    <div className="postDate">
                        <b>{ moment(post.date).format("YYYY - MM - DD") } </b>
                    </div>
                    <div className="commentsNo">
                        <Link to={`/${post.slug}/comments`}>
                            <svg viewBox="0 0 100 100">
                                <use xlinkHref="#icon-bubbles2"></use>
                            </svg>
                            { post.commentsNo }
                        </Link>
                    </div>
                    <div className="tags">
                        <Category categories={post.categories}/>
                    </div>
                </div>
                <div className="moduleBox">
                    <div className="p20">
                        <h2 className="commonListTitle">
                            <Link to={`/${post.slug}`}
                                  dangerouslySetInnerHTML={_this.createMarkup(post.title.rendered)}/>
                        </h2>
                        <div className="postExcerpt"
                             dangerouslySetInnerHTML={_this.createMarkup(post.excerpt.rendered)}></div>
                        <div className="mt10 tar">
                            <Link to={`/${post.slug}`} className="btn">阅读全文</Link>
                        </div>
                    </div>
                </div>

            </div>

        )
    }


    render() {

        const { totalPages,getPageParam,categories, posts,params:{categorySlug} } = this.props;
        let pageParam = getPageParam();
        pageParam = pageParam == null ? 1 : pageParam;

        console.log(posts);
        let _this = this;

        return (

            <div className="homePosts">
                {(()=> {
                    //console.log(categories);
                    if (categorySlug) {
                        return (
                            <div className="postTitle tac">
                                {categories.map(function (category, index) {
                                    //console.log(category.slug,encodeURI(categorySlug));
                                    if (category.slug == encodeURI(categorySlug).toLowerCase()) {
                                        return `[ ${category.name} ] 下的所有文章`;
                                    }
                                    return;
                                })}
                            </div>
                        )
                    }

                })()}

                {posts.map((post) => {
                    return _this.renderPostItem(post);
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

