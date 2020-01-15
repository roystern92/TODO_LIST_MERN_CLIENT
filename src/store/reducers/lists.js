import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    lists: null,
    disabled: false,
    currentList: null,
    showModal: false,
    deletedTaskId: null
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
    return updateObject(state, { currentList: {...action.list}});
};

const setShowModal = (state, action) => {
    return updateObject(state, { showModal: action.showModal});
};


const setDeletedTask = (state, action) => {
    return updateObject(state, { deletedTaskId: action.taskId});
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LISTS: return setLists(state, action);
        case actionTypes.DISABLE_USER_ACTION_START: return disableStart(state, action);
        case actionTypes.DISABLE_USER_ACTION_SUCCESS: return disableSuccess(state, action);
        case actionTypes.SET_CURRENT_LIST: return setCurrentList(state, action);
        case actionTypes.SET_MODAL: return setShowModal(state, action);
        case actionTypes.SET_DELETED_TASK: return setDeletedTask(state, action);
        default:
            return state;
    }
};

export default reducer;