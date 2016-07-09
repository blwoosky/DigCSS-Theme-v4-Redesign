import { GET_GUESTBOOK } from '../actions';

const defaultState = {
    status: "start",
    data: {
        id: -1,
        comment_status: true
    }
};


export default function pages(state = defaultState, {status,type,payload}) {


    switch (type) {

        case GET_GUESTBOOK:

            return {
                ...state,
                status: status,
                data: status != "start" ? payload.data[0] : state.data
            };

            break;
        default:
            return state;


    }

}