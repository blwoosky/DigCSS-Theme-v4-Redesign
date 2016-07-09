import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';

import moment from 'moment';
import ReactPaginate from 'react-paginate';


export default class Posts extends Component {

    constructor(props) {
        //console.log(props);
        super(props);
        this.renderListItem = this.renderListItem.bind(this);

    }

    createMarkup(html) {

        return {
            __html: html
        };

    }


    renderListItem(listItem) {

        if (!(listItem.type == "recarticles" ||
            listItem.type == "videos" ||
            listItem.type == "post" ||
            listItem.type == "snippets" ||
            (listItem.type == "page") && listItem.acf.pubdate)) {
            return;
        }

        let _this = this;

        return (
            <div className="rel postItem mb10" key={listItem.id}>

                <div className="postMeta">
                    <div className="postDate">
                        <b>{ moment(listItem.date).format("YYYY - MM - DD") } </b>
                    </div>
                </div>
                <div className="moduleBox">
                    <div className="p20">
                        {(()=> {

                            if (listItem.type == "page") {
                                return (
                                    <h2 className="commonListTitle courseTitle">
                                        <Link to={`/courses/${listItem.slug}`}>
                                            <svg viewBox="0 0 24 24">
                                                <use xlinkHref="#icon-book">

                                                </use>
                                            </svg>
                                            <span
                                                dangerouslySetInnerHTML={_this.createMarkup(listItem.title.rendered)}/>
                                        </Link>
                                    </h2>
                                )
                            }

                            if (listItem.type == "videos") {
                                return (
                                    <h2 className="commonListTitle videosTitle">
                                        <Link to={`/videos/${listItem.slug}`}>
                                            <svg viewBox="0 0 24 24">
                                                <use xlinkHref="#icon-film">

                                                </use>
                                            </svg>
                                            <span
                                                dangerouslySetInnerHTML={_this.createMarkup(listItem.title.rendered)}/>
                                        </Link>
                                    </h2>
                                )
                            }

                            if (listItem.type == "post") {
                                return (
                                    <h2 className="commonListTitle postsTitle">
                                        <Link to={`/${listItem.slug}`}>
                                            <svg viewBox="0 0 24 24">
                                                <use xlinkHref="#icon-note">

                                                </use>
                                            </svg>
                                            <span
                                                dangerouslySetInnerHTML={_this.createMarkup(listItem.title.rendered)}/>
                                        </Link>
                                    </h2>
                                )
                            }

                            if (listItem.type == "snippets") {
                                return (
                                    <h2 className="commonListTitle snippetsTitle">
                                        <Link to={`/snippets/${listItem.slug}`}>
                                            <svg viewBox="0 0 24 24">
                                                <use xlinkHref="#icon-keyboard">

                                                </use>
                                            </svg>
                                            <span
                                                dangerouslySetInnerHTML={_this.createMarkup(listItem.title.rendered)}/>
                                        </Link>
                                    </h2>
                                )
                            }

                            if (listItem.type == "recarticles") {
                                return (
                                    <h2 className="commonListTitle recTitle">
                                        <a href={listItem.acf.arcLink} target="_blank">
                                            <svg viewBox="0 0 24 24">
                                                <use xlinkHref="#icon-link">

                                                </use>
                                            </svg>
                                            { listItem.title.rendered }
                                        </a>
                                    </h2>
                                )
                            }


                        })()}

                    </div>
                </div>

            </div>
        );

    }


    render() {

        const { list,params:{keyword} } = this.props;
        let _this = this;
        return (

            <div className="searchList">

                {(()=> {
                    if (list.length > 0) {
                        return (
                            <div className="postTitle tac">
                                [ {keyword} ] 的搜索结果:
                            </div>
                        )
                    } else {
                        return (
                            <div className="postTitle tac">
                                没搜到关于[ {keyword} ] 的结果:
                            </div>
                        )
                    }
                })()}


                {list.map(function (listItem) {
                    //console.log(listItem.id);
                    return _this.renderListItem(listItem);
                })}

            </div>
        );
    }
}

