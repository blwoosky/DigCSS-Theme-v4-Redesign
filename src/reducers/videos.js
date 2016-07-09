import { GET_VIDEOS,GET_LATEST_VIDEO ,GET_VIDEO} from '../actions';

const defaultState = {
    videosList: {
        videos: [],
        totalPages: 1,
        status: "start"
    },
    latestVideo: {
        status: "start",
        data: []
    },
    currentVideo: {

        status: "start",
        data: {
            title: "",
            content: "",
            commentsNo: "0",
            date: "0000-00-00",
            id: -1,
            comment_status: true,
            acf: {
                video_dlink: "",
                video_runtime: "",
                video_src: "",
                youku_src: ""
            }
        }

    }
};


export default function videos(state = defaultState, {status,type,payload}) {


    switch (type) {

        case GET_VIDEOS:


            let totalPages = state.videosList.totalPages;
            let vids = state.videosList.videos;

            if (status == "success") {
                totalPages = payload.headers["x-wp-totalpages"];
                vids = payload.data;
            }

            return {
                ...state, videosList: {
                    ...state.videosList,
                    status: status,
                    videos: vids,
                    totalPages: parseInt(totalPages)
                }
            };


            break;

        case GET_LATEST_VIDEO:

            return {
                ...state, latestVideo: {
                    ...state.latestVideo,
                    status: status,
                    data: status == "success" ? payload.data : state.latestVideo.data
                }
            };

            break;

        case GET_VIDEO:

            return {
                ...state, currentVideo: {
                    ...state.currentVideo,
                    status: status,
                    data: status == "success" && payload.data.length > 0 ? payload.data[0] : state.currentVideo.data
                }
            };

        default:
            return state;


    }

}