import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    lists: null,
    disabled: false,
    currentList: null
};


const resetError = (state, action) => {
    return updateObject(state, { error: null});
};

const setLists = (state, action) => {
    return updateObject(state, { lists: action.lists});
};

const disableAddTaskStart = (state, action) => {
    return updateObject(state, { disabled: true, currentList: {...action.list}});
};

const disableAddTaskSuccess = (state, action) => {
    return updateObject(state, { disabled: false});
};

const setCurrentList = (state, action) => {
    return updateObject(state, { currentList: {...action.list}});
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_RESET_ERROR: return resetError(state, action);
        case actionTypes.AUTH_GET_LISTS: return setLists(state, action);
        case actionTypes.DISABLE_ADD_TASK_START: return disableAddTaskStart(state, action);
        case actionTypes.DISABLE_ADD_TASK_SUCCESS: return disableAddTaskSuccess(state, action);
        case actionTypes.SET_CURRENT_LIST: return setCurrentList(state, action);
        default:
            return state;
    }
};

export default reducer;