import { GET_REC_POSTS } from '../actions';

const defaultState = {
    recPostsList: [],
    totalPages: 1,
    status: "start"
};


export default function recPosts(state = defaultState, {status,type,payload}) {

    switch (type) {

        case GET_REC_POSTS:

            let totalPages = state.totalPages;
            let recPostsList = state.recPostsList;

            if (status != "start") {
                totalPages = payload.headers["x-wp-totalpages"];
                recPostsList = payload.data;
            }

            return {
                ...state,
                status: status,
                recPostsList: recPostsList,
                totalPages: parseInt(totalPages)
            };


        default:
            return state;


    }

}