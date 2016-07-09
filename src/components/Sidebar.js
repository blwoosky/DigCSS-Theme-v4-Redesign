import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import Loader from './Loader';
import ReactPaginate from 'react-paginate';

export default class Sidebar extends Component {


    createMarkup(html) {

        return {
            __html: html
        };

    }

    render() {

        let _this = this;

        let { latestVideo,categories,isLoadingVideos,isLoadingCategories,isLoadingRecPosts } = this.props;
        let { recPostsList,totalPages } = this.props.recPosts;

        //console.log(categories);

        return (
            <div className="col-1-3 r">
                <div className={isLoadingVideos ? 'loadingBox isLoading':'loadingBox'}>
                    <div className="loadingContent">
                        <div className="sideItem" rel="latest video">
                            <div className="moduleBox sideVideo">

                                { latestVideo.map(function (video) {
                                    return (
                                        <div className="p15" key={video.id}>
                                            <div className="videoThumbnail rel">
                                                <Link to={`/videos/${video.slug}`}>
                                                    <img src={video.better_featured_image.source_url} alt=""/>
                                                    <svg viewBox="0 0 100 100" className="abs">
                                                        <use xlinkHref="#icon-play_circle_outline"></use>
                                                    </svg>
                                                </Link>
                                            </div>
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
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                    {
                        (()=> {
                            if (isLoadingVideos) {
                                return <Loader/>
                            }
                        })()
                    }
                </div>

                <div
                    className={isLoadingCategories ? 'loadingBox isLoading':'loadingBox'}>
                    <div className="loadingContent">
                        <div className="sideItem mt10" rel="categories">
                            <div className="moduleBox sideArticles">
                                <div className="p15">
                                    <h5>文章分类:</h5>
                                    <ul className="list-inline mt10">
                                        { categories.map(function (category) {
                                            if (category.count != 0) {
                                                return (
                                                    <li key={category.id} class="cat-item cat-item-3">
                                                        <Link to={`/category/${category.slug}`}>
                                                            { category.name }
                                                            ({ category.count })
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                        }) }
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    {
                        (()=> {
                            if (isLoadingCategories) {
                                return <Loader/>
                            }
                        })()
                    }
                </div>

                <div
                    className={isLoadingRecPosts ? 'loadingBox isLoading':'loadingBox'}>
                    <div className="loadingContent">
                        <div className="sideItem mt10" rel="recommend">
                            <div className="moduleBox sideRecommend">
                                <div className="p15">
                                    <ul>
                                        {recPostsList.map(function (post) {
                                            return (
                                                <li key={post.id}>
                                                    <a href={post.acf.arcLink} target="_blank"
                                                       title={`文章作者-${post.acf.arcAuthor}`}>
                                                        <svg viewBox="0 0 100 100">
                                                            <use xlinkHref="#icon-link"></use>
                                                        </svg>
                                                <span
                                                    dangerouslySetInnerHTML={_this.createMarkup(post.title.rendered)}/>
                                                    </a>
                                                </li>
                                            )
                                        })}

                                    </ul>
                                    {(()=> {
                                        if (totalPages > 1) {

                                            return (
                                                <div className="tac mt5">

                                                    <ReactPaginate previousLabel={`<`}
                                                                   nextLabel={`>`}
                                                                   breakLabel={"..."}
                                                                   pageNum={totalPages}
                                                                   marginPagesDisplayed={3}
                                                                   pageRangeDisplayed={4}
                                                                   clickCallback={this.props.handlePageClick}
                                                                   containerClassName={"pagination"}
                                                                   subContainerClassName={"pages pagination"}
                                                                   activeClassName={"active"}
                                                                   forceSelected={0}/>

                                                </div>
                                            )
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (()=> {
                            if (isLoadingRecPosts) {
                                return <Loader/>
                            }
                        })()
                    }
                </div>


            </div>
        );
    }
}
