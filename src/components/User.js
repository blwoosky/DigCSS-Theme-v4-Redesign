import React, { Component } from 'react';
import { Link } from 'react-router'


export default class User extends Component {
    render() {
        return (
            <div className="userWrap rel r">
                    <span className="gravatar">
                        <svg viewBox="0 0 100 100">
                            <use xlinkHref="#icon-user"></use>
                        </svg>
                    </span>
                <div className="userInfo abs">
                    <h4>Hi,BlwooSky</h4>
                    <p>
                        欢迎您来到 DigCSS，<br/>
                        您可以到留言板进行留言，或者在
                        文章、视频下方进行留言哦\^_^/
                    </p>
                </div>
            </div>
        )

    }
}