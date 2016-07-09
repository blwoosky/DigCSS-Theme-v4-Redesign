import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import moment from 'moment';
import ReactPaginate from 'react-paginate';


export default class SnippetsList extends Component {

    constructor(props) {
        //console.log(props);
        super(props);
    }

    createMarkup(html) {

        return {
            __html: html
        };

    }


    renderPostItem(snippet) {

        let _this = this;
        return (
            <li key={snippet.id}>
                <Link to={`/snippets/${snippet.slug}`}
                      dangerouslySetInnerHTML={_this.createMarkup(snippet.title.rendered)}>
                </Link>
            </li>
        )
    }


    render() {

        let _this = this;
        const { totalPages,totalCount,getPageParam,snippetsTags,getTagParam, snippetsList } = this.props;
        let pageParam = getPageParam();
        let tagParam = getTagParam();

        //console.log(videosList);

        return (

            <div>

                <div className="pl20 pr20 commonPageTitle">
                    <div className="moduleBox">
                        <ul className="list-inline tac snippetsTagMenu">

                            {(()=> {
                                if (totalCount) {
                                    return (
                                        <li className="mb5">
                                            <Link to={`/snippets`} activeClassName="active"
                                                  className={tagParam?"":"active"}>
                                                全部 <span className="tagCount">{totalCount}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                            })()}

                            {snippetsTags.map(function (tag) {

                                if (tag.count != 0) {
                                    return (
                                        <li key={tag.id} className="mb5">
                                            <Link activeClassName="active" className={tagParam == tag.slug?"active":""}
                                                  to={`/snippets/tag/${tag.slug}`}>
                                                {tag.name} <span className="tagCount">{tag.count}</span>
                                            </Link>
                                        </li>
                                    );
                                }


                            })}
                        </ul>
                    </div>
                </div>

                <div className="moduleBox snippetsList mb30">
                    <div className="p15">
                        <ul>
                            {snippetsList.map(function (snippet) {
                                return _this.renderPostItem(snippet);
                            })}
                        </ul>
                    </div>
                </div>

                {(()=> {
                    if (totalPages > 1) {

                        return (
                            <div className="tac mb10">

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

