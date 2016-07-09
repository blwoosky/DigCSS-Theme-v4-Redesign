import React, { Component } from 'react';
import { Link,IndexLink } from 'react-router'

import IconMain from './IconMain';
import Logo from './Logo';
import SearchFormContainer from './../containers/SearchFormContainer';
import User from './User';

export default class Header extends Component {

    render() {
        let {setOpened,isOpened,navNow} = this.props;
        //console.log(navNow);
        return (
            <header className={isOpened?"opened":""}>
                <div className="wrap mainNavWrap fix">
                    <div className="logo l">
                        <Link to="/"><Logo/></Link>
                    </div>

                    <div className="collapseMenu rel r" onClick={()=>{setOpened(!isOpened)}}>
                        <svg viewBox="0 0 100 100" className="menuBtn abs">
                            <use xlinkHref="#icon-menu"></use>
                        </svg>
                        <svg viewBox="0 0 100 100" className="closeBtn abs">
                            <use xlinkHref="#icon-cross"></use>
                        </svg>
                    </div>

                    <div className="fix r headerRight">

                        <nav className="mainNav l">
                            <IconMain/>
                            <ul className="fix">
                                <li className="home">
                                    <IndexLink to="/" activeClassName="active" onClick={()=>{setOpened(false)}}>
                                        <svg viewBox="0 0 100 100" className="icon icon-home">
                                            <use xlinkHref="#icon-home"></use>
                                        </svg>
                                        <span>首页</span>
                                    </IndexLink>
                                </li>
                                <li className="videos">
                                    <Link to="/videos" className={navNow == "videos"?"active":""}
                                          activeClassName="active"
                                          onClick={()=>{setOpened(false)}}>
                                        <svg viewBox="0 0 100 100" className="icon icon-film">
                                            <use xlinkHref="#icon-film"></use>
                                        </svg>
                                        <span>视频</span>
                                    </Link>
                                </li>
                                <li className="snippets">
                                    <Link to="/snippets" className={navNow == "snippets"?"active":""}
                                          activeClassName="active" onClick={()=>{setOpened(false)}}>
                                        <svg viewBox="0 0 100 100">
                                            <use xlinkHref="#icon-keyboard"></use>
                                        </svg>
                                        <span>代码</span>
                                    </Link>
                                </li>
                                <li className="courses">
                                    <Link to="/courses" className={navNow == "courses"?"active":""}
                                          activeClassName="active" onClick={()=>{setOpened(false)}}>
                                        <svg viewBox="0 0 100 100">
                                            <use xlinkHref="#icon-book"></use>
                                        </svg>
                                        <span>课程</span>
                                    </Link>
                                </li>
                                <li className="guestbook">
                                    <Link to="/guestbook" className={navNow == "guestbook"?"active":""}
                                          activeClassName="active" onClick={()=>{setOpened(false)}}>
                                        <svg viewBox="0 0 100 100">
                                            <use xlinkHref="#icon-bubbles2"></use>
                                        </svg>
                                        <span>留言</span>
                                    </Link>
                                </li>

                            </ul>
                        </nav>

                        <SearchFormContainer {...this.props} {...this}/>

                    </div>
                </div>
            </header>
        );
    }
}
