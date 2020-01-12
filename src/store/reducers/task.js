import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    currentTask: null,
    note: null,
    title: null,
    important: null,
    completed: null,
};


const setCurrentTitle = (state, action) => {
    return updateObject(state,  {title : action.title});
};

const setCurrentNote = (state, action) => {
    return updateObject(state, { note: action.note});
};



const setCurrentTask = (state, action) => {
    let note = action.task ? action.task.note : null;
    let title = action.task ? action.task.task : null;
    let task = action.task ? {...action.task} : null;
    return updateObject(state,
        {note: note, title : title, currentTask: task});
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_NOTE: return setCurrentNote(state, action);
        case actionTypes.SET_CURRENT_TITLE: return setCurrentTitle(state, action);
        case actionTypes.SET_CURRENT_TASK: return setCurrentTask(state, action);
        default:
            return state;
    }
};

export default reducer;