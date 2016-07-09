import { GET_COURSES_PAGE,GET_COURSES,GET_COURSE } from '../actions';

const defaultState = {

    courseList: {
        courses: [],
        totalPages: 0,
        status: "start"
    },
    coursePage: {
        data: {
            id: -1
        },
        status: "start"
    },
    course: {
        data: {
            id: -1,
            title: "",
            content: "",
            acf: {
                pubdate: "0000-00-00",
                price: "",
                isRecommend: false,
                isNew: false,
                link_study163: "",
                cover_img: "",
                link_taobao: "",
                course_intro: "",
                class_hours: ""
            }
        },
        status: "start"
    }

};


export default function courses(state = defaultState, {status,type,payload}) {

    switch (type) {

        case GET_COURSES:


            let totalPages = state.courseList.totalPages;
            let coursesData = state.courseList.courses;

            if (status != "start") {
                totalPages = payload.headers["x-wp-totalpages"];
                coursesData = payload.data;
            }

            return {
                ...state, courseList: {
                    ...state.courseList,
                    status: status,
                    courses: coursesData,
                    totalPages: parseInt(totalPages)
                }
            };


            break;

        case GET_COURSES_PAGE:

            return {
                ...state, coursePage: {
                    ...state.coursePage,
                    status: status,
                    data: status != "start" ? payload.data[0] : state.coursePage.data
                }
            };

            break;

        case GET_COURSE:

            return {
                ...state, course: {
                    ...state.course,
                    status: status,
                    data: status != "start" && payload.data.length > 0 ? payload.data[0] : state.course.data
                }
            };

        default:
            return state;


    }

}