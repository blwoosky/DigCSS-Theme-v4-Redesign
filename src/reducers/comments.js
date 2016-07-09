import { GET_COMMENTS,CREATE_COMMENT } from '../actions';

const defaultState = {
    allComments: {
        comments: [],
        totalPages: 1,
        status: "start"
    },
    newComments: {
        err: false,
        errMsg: "",
        data: [],
        status: "start"
    }
};

export default function comments(state = defaultState, {status,type,payload}) {

    switch (type) {

        case GET_COMMENTS:


            let totalPages = state.allComments.totalPages;
            let commentsData = state.allComments.comments;

            if (status != "start") {
                totalPages = payload.headers["x-wp-totalpages"];
                commentsData = payload.data;
            }

            return {
                ...state, allComments: {
                    status: status,
                    comments: commentsData,
                    totalPages: parseInt(totalPages)
                }
            };
            break;

        case CREATE_COMMENT:

            //console.log(typeof action.payload.status);
            if (status == "start")
                return {
                    ...state, newComments: {
                        ...state.newComments,
                        status: status,
                        data: state.newComments.data
                    }
                };


            switch (payload.status) {
                case 201:

                    //console.log(state);

                    return {
                        ...state, newComments: {
                            ...state.newComments,
                            status: status,
                            data: [...state.newComments.data, payload.data]
                        }
                    };

                    //commentsData = {...state,{a:1}};

                    break;
                case 409:

                    return {
                        ...state, newComments: {
                            ...state.newComments,
                            status: status,
                            err: true,
                            errMsg: "您的留言疑似有重复哦!"
                        }
                    };

                    break;
                case 429:

                    return {
                        ...state, newComments: {
                            ...state.newComments,
                            status: status,
                            err: true,
                            errMsg: "您的操作太频繁,请稍后再试!"
                        }
                    };

                    break;
            }

            //console.log(commentsData);

            break;


        default:
            return state;


    }
}















