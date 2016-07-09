export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';

export const GET_VIDEOS = 'GET_VIDEOS';
export const GET_VIDEO = 'GET_VIDEO';
export const GET_LATEST_VIDEO = 'GET_LATEST_VIDEO';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const GET_REC_POSTS = 'GET_REC_POSTS';

export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export const GET_SNIPPETS = 'GET_SNIPPETS';
export const GET_SNIPPET = 'GET_SNIPPET';
export const GET_SNIPPETS_TAGS = 'GET_SNIPPETS_TAGS';
export const GET_SNIPPETS_TOTALCOUNT = 'GET_SNIPPETS_TOTALCOUNT';

export const SEARCH = 'SEARCH';

export const GET_GUESTBOOK = 'GET_GUESTBOOK';

export const GET_COURSES_PAGE = 'GET_COURSES_PAGE';
export const GET_COURSES = 'GET_COURSES';
export const GET_COURSE = 'GET_COURSE';

import axios from "axios";
import { BASE_WP_URL, CREATE_COMMENT_URL} from "../wp-url";

const WP_URL = `${BASE_WP_URL}/wp/v2/`;
const SEARCH_URL = `${BASE_WP_URL}/swp_api/search`;


let defaultPostsQuery = {

    page: 1,
    per_page: 4,
    postType: "posts"

};

function getPostsByType(query) {

    let queryParam = {...defaultPostsQuery, ...query};
    let catString = "";

    if (queryParam.category) {
        catString = `filter[category_name]=${queryParam.category}`;
        delete queryParam.category;
    }


    let request = axios.get(`${WP_URL}${queryParam.postType}?${catString}`, {
        params: queryParam
    });


    return request;

}


function getPostByType(query) {

    let queryParam = {postType: "posts", ...query};

    return axios.get(`${WP_URL}${queryParam.postType}`, {
        params: {
            slug: queryParam.slug
        }
    });

}

export function getPosts(query) {

    let request = getPostsByType(query);

    return {
        type: GET_POSTS,
        payload: request
    };
}

export function getPost(query) {

    let request = getPostByType(query);

    return {
        type: GET_POST,
        payload: request
    };

}

export function getVideos(query) {

    let videoQuery = {per_page: 6, postType: "videos", ...query};

    let request = getPostsByType(videoQuery);

    return {
        type: GET_VIDEOS,
        payload: request
    };

}

export function getVideo(query) {

    let videoQuery = {postType: "videos", ...query};

    let request = getPostByType(videoQuery);

    return {
        type: GET_VIDEO,
        payload: request
    };
}

export function getLatestVideo() {

    let request = getPostsByType({per_page: 1, postType: "videos"});

    return {
        type: GET_LATEST_VIDEO,
        payload: request
    };

}

/* get snippets method */
export function getSnippets(query) {

    let snippetsQuery = {per_page: 6, postType: "snippets", ...query};

    let request = getPostsByType(snippetsQuery);

    return {
        type: GET_SNIPPETS,
        payload: request
    };
}


/* get a single snippet method */

export function getSnippet(query) {

    let snippetQuery = {postType: "snippets", ...query};

    let request = getPostByType(snippetQuery);

    return {
        type: GET_SNIPPET,
        payload: request
    };
}

export function getSnippetsTotalCount(query) {
    let snippetsQuery = {per_page: 1, postType: "snippets", ...query};

    let request = getPostsByType(snippetsQuery);

    return {
        type: GET_SNIPPETS_TOTALCOUNT,
        payload: request
    };
}


export function getCategories() {

    let request = axios.get(`${WP_URL}categories`, {
        params: {
            per_page: 100
        }
    });

    return {
        type: GET_CATEGORIES,
        payload: request
    };

}


export function getSnippetsTags() {
    let request = axios.get(`${WP_URL}snippetstags`, {
        params: {
            per_page: 100
        }
    });

    return {
        type: GET_SNIPPETS_TAGS,
        payload: request
    };
}

export function getRecPosts(query) {

    let recPostsQuery = {per_page: 6, postType: "recarticles", ...query};
    let request = getPostsByType(recPostsQuery);

    return {
        type: GET_REC_POSTS,
        payload: request
    };

}


export function getComments(query) {

    let commentsQuery = {per_page: 100, page: 1, orderby: "parent", ...query};

    let request = axios.get(`${WP_URL}comments`, {
        params: commentsQuery
    });

    return {
        type: GET_COMMENTS,
        payload: request,
        meta: {
            pageNum: commentsQuery.pageNum
        }
    };

}


export function createComment(props) {

    //console.log("CREATE COMMENT=-=-=-=",props);
    let request = axios.post(`${CREATE_COMMENT_URL}`, props);

    return {
        type: CREATE_COMMENT,
        payload: request
    };

}


export function search(query) {

    let queryParam = {nopaging: true, page: 1, s: "", ...query};

    let request = axios.get(SEARCH_URL, {
        params: queryParam
    });

    return {
        type: SEARCH,
        payload: request
    };

}


export function getGuestBook(query) {

    let pageQuery = {postType: "pages", slug: "guestbook", ...query};

    let request = getPostByType(pageQuery);

    return {
        type: GET_GUESTBOOK,
        payload: request
    };
}


export function getCoursesPage(query) {

    let pageQuery = {postType: "pages", slug: "courses", ...query};

    let request = getPostByType(pageQuery);

    return {
        type: GET_COURSES_PAGE,
        payload: request
    };
}


export function getCourses(query) {

    let pageQuery = {per_page: 6, postType: "pages", ...query};

    let request = getPostsByType(pageQuery);

    return {
        type: GET_COURSES,
        payload: request
    };

}

export function getCourse(query) {

    let pageQuery = {postType: "pages", ...query};

    let request = getPostByType(pageQuery);

    return {
        type: GET_COURSE,
        payload: request
    };
}




































