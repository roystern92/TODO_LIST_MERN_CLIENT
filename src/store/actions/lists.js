import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-todo-lists";



export const addingNewTask = (list, task) => {
    return async dispatch => {
        try {
            let data = new FormData();
            let currentList = {...list};
            currentList.tasks.push(task);

            dispatch(disableStart(list));

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
            let url = '/admin/todo-item/' + list._id;
            data.append('task', task.task);

            await axios.post(url, data);

            await fetchCurrentListHelper(dispatch, list.name);
            dispatch(disableSuccess());

        } catch (e) {
            console.log(e);
        }

    };
};

export const onDeleteTask = (currentList, taskId) => {
    return async dispatch => {
        try {
            let tasks = currentList.tasks.filter(task => {
                return (task._id !== taskId);
            });

            let list = {...currentList};
            list.tasks = [...tasks];

            dispatch(disableStart(list));

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
            let url = '/admin/todo-item/' + taskId;
            await axios.delete(url);

            dispatch(disableSuccess());
            fetchCurrentListHelper(dispatch, currentList.name);

        } catch (e) {
            console.log(e);
        }

    };
};

export const fetchCurrentListHelper = async (dispatch, listName) => {
    try{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
        let url = '/admin/list/' + listName;

        let result = await axios.get(url);

        let currentList = result.data.list;
        dispatch(setList(currentList));
    }
    catch (e) {
        console.log(e.response);
    }
};

export const fetchCurrentList = (listName) => {
    return async (dispatch) => {
        try {
            await fetchCurrentListHelper(dispatch, listName);
        }catch (e) {
            console.log(e.response);
        }
    };
};





export const disableStart = (list) => {
    return {
        type: actionTypes.DISABLE_USER_ACTION_START,
        list: list
    };
};


export const disableSuccess = () => {

    return {
        type: actionTypes.DISABLE_USER_ACTION_SUCCESS
    };
};


export const setList = (list) => {
    return {
        type: actionTypes.SET_CURRENT_LIST,
        list: list
    };
};

const getLists = (lists) => {
    return {
        type: actionTypes.GET_LISTS,
        lists: lists
    };
};

export const setModal = (showModal) => {
    return {
        type: actionTypes.SET_MODAL,
        showModal: showModal
    };
};
export const setDeletedTask = (taskId) => {
    return {
        type: actionTypes.SET_DELETED_TASK,
        taskId: taskId
    };
};

