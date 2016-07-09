import { GET_POSTS } from '../actions';


const defaultState = {
    posts: [],
    totalPages: 1,
    status: "start"
};

//console.log(JSON.stringify(defaultState));


export default function posts(state = defaultState, {status,type,payload}) {

    switch (type) {

        case GET_POSTS:

            let totalPages = state.totalPages;
            let posts = state.posts;

            if (status == "success") {
                totalPages = payload.headers["x-wp-totalpages"];
                posts = payload.data;
            }

            return {
                ...state,
                status: status,
                posts: posts,
                totalPages: parseInt(totalPages)
            };


        default:
            return state;


    }

}