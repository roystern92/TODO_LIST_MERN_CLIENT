import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    lists: null,
    disabled: false,
    currentList: null,
    currentTask: null
};



const setLists = (state, action) => {
    return updateObject(state, { lists: action.lists});
};

const disableStart = (state, action) => {
    return updateObject(state, { disabled: true, currentList: {...action.list}});
};

const disableSuccess = (state, action) => {
    return updateObject(state, { disabled: false});
};

const setCurrentList = (state, action) => {
    return updateObject(state, { currentList: {...action.list}, currentTask:null});
};

const setCurrentTask = (state, action) => {
    return updateObject(state, { currentTask: {...action.task}});
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LISTS: return setLists(state, action);
        case actionTypes.DISABLE_USER_ACTION_START: return disableStart(state, action);
        case actionTypes.DISABLE_USER_ACTION_SUCCESS: return disableSuccess(state, action);
        case actionTypes.SET_CURRENT_LIST: return setCurrentList(state, action);
        case actionTypes.SET_CURRENT_TASK: return setCurrentTask(state, action);
        default:
            return state;
    }
};

export default reducer;