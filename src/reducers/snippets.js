import { GET_SNIPPET,GET_SNIPPETS_TAGS,GET_SNIPPETS_TOTALCOUNT,GET_SNIPPETS} from '../actions';

const defaultState = {
    snippetsList: {
        snippets: [],
        totalPages: 1,
        status: "start"
    },
    snippet: {
        status: "start",
        data: {
            title: "",
            content: "",
            commentsNo: "0",
            date: "0000-00-00",
            comment_status: true,
            id: -1
        }
    },
    totalCount: {
        status: "start",
        data: 0
    },
    snippetsTags: {
        status: "start",
        data: []
    }
};


export default function snippets(state = defaultState, {status,type,payload}) {

    switch (type) {

        case GET_SNIPPETS:

            let totalPages = state.snippetsList.totalPages;
            let snippetsData = state.snippetsList.snippets;

            if (status != "start") {
                totalPages = payload.headers["x-wp-totalpages"];
                snippetsData = payload.data;
            }

            return {
                ...state, snippetsList: {
                    ...state.snippetsList,
                    status: status,
                    snippets: snippetsData,
                    totalPages: parseInt(totalPages)
                }
            };
            break;

        case GET_SNIPPET:

            return {
                ...state, snippet: {
                    ...state.snippet,
                    status: status,
                    data: status != "start" && payload.data.length > 0 ? payload.data[0] : state.snippet.data
                }
            };

            break;
        case GET_SNIPPETS_TAGS:
            return {
                ...state, snippetsTags: {
                    ...state.snippetsTags,
                    status: status,
                    data: status != "start" ? payload.data : state.snippetsTags.data
                }
            };

        case GET_SNIPPETS_TOTALCOUNT:
            return {
                ...state, totalCount: {
                    ...state.totalCount,
                    status: status,
                    data: status != "start" ? payload.headers["x-wp-total"] : 0
                }
            };
        default:
            return state;

    }

}