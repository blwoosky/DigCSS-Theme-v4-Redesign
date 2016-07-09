import { SEARCH } from '../actions';


let defaults = {
    searchList: [],
    status: "start"
};

export default function search(state = defaults, {status,type,payload}) {


    switch (type) {

        case SEARCH:

            return {
                ...state,
                status: status,
                searchList: status == "success" ? payload.data : state.searchList
            };


            break;

        default :
            return state;

    }
}