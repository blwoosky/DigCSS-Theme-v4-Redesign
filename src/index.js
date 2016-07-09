import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import SearchListContainer from './containers/SearchListContainer';
import VideosListContainer from './containers/VideosListContainer';
import VideoContainer from './containers/VideoContainer';
import SnippetsListContainer from './containers/SnippetsListContainer';
import SnippetContainer from './containers/SnippetContainer';
import GuestBookContainer from './containers/GuestBookContainer';

import CourseListContainer from './containers/CourseListContainer';
import CourseContainer from './containers/CourseContainer';

const store = configureStore();

import "./sass/style.scss";

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>

                <IndexRoute component={PostsContainer}/>
                <Route path="/" component={PostsContainer}/>
                <Route path="/page(/:pageNum)" component={PostsContainer}/>
                <Route path="/category/:categorySlug(/:pageNum)" component={PostsContainer}/>

                <Route path="/search/:keyword" component={SearchListContainer}/>

                <Route path="/videos(/page)" component={VideosListContainer}/>
                <Route path="/videos/page(/:pageNum)" component={VideosListContainer}/>
                <Route path="/videos/:slug(/comments)(/:pageNum)" component={VideoContainer}/>

                <Route path="/courses(/page)" component={CourseListContainer}/>
                <Route path="/courses/page(/:pageNum)" component={CourseListContainer}/>
                <Route path="/courses/:slug" component={CourseContainer}/>

                <Route path="/snippets(/page)" component={SnippetsListContainer}/>
                <Route path="/snippets/page(/:pageNum)" component={SnippetsListContainer}/>
                <Route path="/snippets/tag/:snippetsTag(/page)(/:pageNum)" component={SnippetsListContainer}/>

                <Route path="/snippets/:slug(/comments)(/:pageNum)" component={SnippetContainer}/>

                <Route path="/guestbook" component={GuestBookContainer}/>
                <Route path="/guestbook(/:pageNum)" component={GuestBookContainer}/>

                <Route path="/404" component={NotFound}/>

                <Route path="/:slug(/comments(/:pageNum))" component={PostContainer}/>

                <Route path="/*" component={NotFound}/>


            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
