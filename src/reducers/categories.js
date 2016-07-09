import { GET_CATEGORIES } from '../actions';

let defaults = {
    categoryList: [],
    status: "start"
};

export default function posts(state = defaults, {status,type,payload}) {

    switch (type) {

        case GET_CATEGORIES:

            return {...state, status: status, categoryList: status != "start" ? payload.data : state.categoryList};

        default:
            return state;

    }

}