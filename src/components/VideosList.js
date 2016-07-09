import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import moment from 'moment';
import ReactPaginate from 'react-paginate';


export default class VideosList extends Component {

    constructor(props) {
        //console.log(props);
        super(props);
    }

    createMarkup(html) {

        return {
            __html: html
        };

    }


    renderPostItem(video) {

        var _this = this;
        return (
            <div key={video.id} className="mb10">
                <div className="postMeta">

                    <div className="postDate">
                        <b>{ moment(video.date).format("YYYY - MM - DD") } </b>
                    </div>
                    <div className="commentsNo">
                        <Link to={`/videos/${video.slug}/comments`}>
                            <svg viewBox="0 0 100 100">
                                <use xlinkHref="#icon-bubbles2"></use>
                            </svg>
                            { video.commentsNo }
                        </Link>
                    </div>
                </div>
                <div className="moduleBox">
                    <div className="p15">
                        <div className="fix">
                            <div className="l mr20 thumbnailImg">
                                <Link to={`/videos/${video.slug}`}>
                                    <img src={video.better_featured_image.source_url} alt=""/>
                                </Link>
                            </div>
                            <div className="cell">
                                <h4>
                                    <Link to={`/videos/${video.slug}`}
                                          dangerouslySetInnerHTML={_this.createMarkup(video.title.rendered)}/>
                                </h4>
                                <p className="videoRuntime">
                                    RUNTIME: { video.acf.video_runtime }
                                </p>
                                <div className="videoExcerpt"
                                     dangerouslySetInnerHTML={_this.createMarkup(video.excerpt.rendered)}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    render() {

        const { totalPages,getPageParam, videosList } = this.props;
        let pageParam = getPageParam();
        pageParam = pageParam == null ? 1 : pageParam;

        let _this = this;

        //console.log(videosList);

        return (

            <div className="thumbnailList">

                {videosList.map(function (video) {
                    return _this.renderPostItem(video);
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

