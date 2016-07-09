import { combineReducers } from 'redux';
// TODO: try to import * from './' instead of importing individual reducers

import posts from "./posts";
import videos from "./videos";
import categories from "./categories";
import recPosts from "./recPosts";
import post from "./post";
import comments from "./comments";
import search from "./search";
import snippets from "./snippets";
import guestbook from "./guestbook";
import courses from "./courses";

import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    posts: posts,
    videos: videos,
    categories: categories,
    recPosts: recPosts,
    post: post,
    comments: comments,
    snippets: snippets,
    search: search,
    guestbook: guestbook,
    courses: courses,
    form: formReducer
});

export default rootReducer;