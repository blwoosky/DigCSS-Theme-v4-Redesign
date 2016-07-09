import { GET_POST } from '../actions';

let defalutPost = {

    status: "start",
    data: {
        title: "",
        content: "",
        commentsNo: "0",
        date: "0000-00-00",
        id: -1,
        comment_status: true,
        cateGory: []
    }

};

export default function post(state = defalutPost, {status,type,payload}) {


    switch (type) {

        case GET_POST:

            return {
                ...state,
                status: status,
                data: status == "success" && payload.data.length > 0 ? payload.data[0] : state.data
            };


        default:
            return state;


    }

}