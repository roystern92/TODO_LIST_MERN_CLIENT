import axios from '../../axios/axios-todo-lists';
import * as actionTypes from './actionTypes';
import * as actions from "./index";


const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};


const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

//
//
// export const addingNewTask = (list, task) => {
//     return async dispatch => {
//         try {
//             let data = new FormData();
//             let currentList = {...list};
//             currentList.tasks.push(task);
//
//             dispatch(disableStart(list));
//
//             axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
//             let url = '/admin/todo-item/' + list._id;
//             data.append('task', task.task);
//
//             await axios.post(url, data);
//
//             await fetchCurrentList(dispatch, list.name);
//             dispatch(disableSuccess());
//
//         } catch (e) {
//             console.log(e);
//         }
//
//     };
// };
//
// const fetchCurrentList = async (dispatch, listName) => {
//     try{
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
//         let url = '/admin/list/' + listName;
//
//         let result = await axios.get(url);
//
//         let currentList = result.data.list;
//         dispatch(setList(currentList));
//     }
//     catch (e) {
//         console.log(e.response);
//     }
// };
//
//
// export const onDeleteTask = (currentList, taskId) => {
//     return async dispatch => {
//         try {
//
//             let tasks = currentList.tasks.filter(task => {
//                 return (task._id !== taskId);
//             });
//
//             let list = {...currentList};
//             list.tasks = [...tasks];
//
//             dispatch(disableStart(list));
//
//             axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
//             let url = '/admin/todo-item/' + taskId;
//             await axios.delete(url);
//
//             dispatch(disableSuccess());
//             fetchCurrentList(dispatch, currentList.name);
//
//         } catch (e) {
//             console.log(e);
//         }
//
//     };
// };
//
//
// export const disableStart = (list) => {
//     return {
//         type: actionTypes.DISABLE_USER_ACTION_START,
//         list: list
//     };
// };
//
//
// export const disableSuccess = () => {
//
//     return {
//         type: actionTypes.DISABLE_USER_ACTION_SUCCESS
//     };
// };
//
// export const setList = (list) => {
//     return {
//         type: actionTypes.SET_CURRENT_LIST,
//         list: list
//     };
// };

export const authResetError = () => {
    return {
        type: actionTypes.AUTH_RESET_ERROR
    };
};

const createMyDayList = async () => {
    const formData = new FormData();
    formData.append('name', "My Day");
    formData.append('isPublic', false);
    formData.append('isRemovable', false);

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();

    return axios.post('http://localhost:8080/admin/list', formData);

};


// const getLists = (lists) => {
//     return {
//         type: actionTypes.GET_LISTS,
//         lists: lists
//     };
// };

// const fetchListsHelper = async (dispatch) => {
//     try{
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
//         let result = await axios.get('http://localhost:8080/admin/lists');
//         let lists = result.data.lists;
//         dispatch(getLists(lists));
//     }
//     catch (e) {
//         console.log(e.response);
//     }
// };
//
//
// export const fetchLists = () => {
//     return async (dispatch) => {
//         try {
//             await fetchListsHelper(dispatch);
//         }catch (e) {
//             console.log(e.response);
//         }
//     };
// };


export const postAuth = async (formData, url, signUp, dispatch) => {

    try {
        let res = await axios.post(url, formData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresTimeInMiliseconds);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.userId);
        let timeToLogout = expirationDate.getTime() - new Date().getTime();

        dispatch(checkAuthTimeout(timeToLogout));

        if (signUp) {
            await createMyDayList();
        }

        await actions.fetchListsHelper(dispatch);
        dispatch(authSuccess(res.data.token, res.data.userId));
    } catch (e) {
        console.log(e.response);
        dispatch(authFail(e.response.data.message));
    }
}


export const auth = (email, password, name, signUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = '/auth/login';

        const formData = new FormData();

        if (signUp) {
            formData.append('name', name);
            url = '/auth/signup';
        }

        formData.append('email', email);
        formData.append('password', password);

        postAuth(formData, url, signUp, dispatch);
    }
};




export const authCheckState =  () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {

                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));

                await actions.fetchListsHelper(dispatch);
            }
        }
    };
};















