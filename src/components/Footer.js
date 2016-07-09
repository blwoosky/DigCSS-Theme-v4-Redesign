import React, { Component } from 'react';
import {Link} from "react-router";

import FooterIcon from './FooterIcon';

export default class Footer extends Component {
    render() {
        return (
            <footer className="mt40">
                <FooterIcon/>
                <div className="wrap fix">
                    <div className="footerLeft l">
                        <div>
                            <ul className="fix">
                                <li className="icon_study163">
                                    <a href="http://study.163.com/u/blwoosky" target="_blank">
                                        <svg viewBox="0 0 100 100">
                                            <use xlinkHref="#icon-study163"></use>
                                        </svg>
                                    </a>
                                </li>
                                <li className="icon_weibo">
                                    <a href="http://weibo.com/blwoosky" target="_blank">
                                        <svg viewBox="0 0 100 100">
                                            <use xlinkHref="#icon-weibo"></use>
                                        </svg>
                                    </a>
                                </li>
                                <li className="icon_youku">
                                    <a href="http://i.youku.com/i/UNTExMjUyODQ4/videos" target="_blank">
                                        <svg viewBox="0 -34 100 100">
                                            <use xlinkHref="#icon-youku"></use>
                                        </svg>
                                    </a>
                                </li>
                                <li className="icon_taobao">
                                    <a href="https://shop142960626.taobao.com/" target="_blank">
                                        <svg viewBox="0 0 100 100">
                                            <use xlinkHref="#icon-taobao"></use>
                                        </svg>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="footerRight r">
                        <div>
                            <div>
                                <Link to="/">DigCSS</Link> 由 <a href="http://blwoosky.com" target="_blank">Blwoosky</a>设计与维护 <br/>
                                虚拟主机由 <a href="https://www.hupohost.com/" target="_blank">[ 琥珀主机 ]</a> 提供 <br/>
                                后台程序使用 <a href="https://cn.wordpress.org/" target="_blank">WordPress</a> <br/>
                                <Link to="/guestbook">联系 DigCSS</Link>
                            </div>
                            <div className="tar">
                                <a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备16010132号-2</a> <br/>
                                Copyright © 2013-2016 <a href="/">DIGCSS.COM</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}