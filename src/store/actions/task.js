import * as actionTypes from "./actionTypes";



export const setNote = (note) => {

    return {
        type: actionTypes.SET_CURRENT_NOTE,
        note: note
    };
};


export const setTitle = (title) => {
    return {
        type: actionTypes.SET_CURRENT_TITLE,
        title: title
    };
};



export const setCurrentTask = (task) => {
    return {
        type: actionTypes.SET_CURRENT_TASK,
        task: task
    };
};






