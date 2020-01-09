import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    lists: null,
    disabled: false,
    currentList: null,
    user: null
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const authSuccess = (state, action) => {

    return updateObject(state, {
        error: null,
        loading: false,
        token: action.token,
        userId: action.userId
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null , loading: false, lists: null, error: null});
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

const setUserProfile = (state, action) => {
    return updateObject(state, { user: {...action.user}});
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_RESET_ERROR: return resetError(state, action);
        case actionTypes.GET_LISTS: return setLists(state, action);
        case actionTypes.DISABLE_USER_ACTION_START: return disableAddTaskStart(state, action);
        case actionTypes.DISABLE_USER_ACTION_SUCCESS: return disableAddTaskSuccess(state, action);
        case actionTypes.SET_CURRENT_LIST: return setCurrentList(state, action);
        case actionTypes.AUTH_USER_PROFILE: return setUserProfile(state, action);
        default:
            return state;
    }
};

export default reducer;