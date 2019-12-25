import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    createMyDayList: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authFail = (state, action) => {
    let error = action.error;
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
    return updateObject(state, { token: null, userId: null , loading: false});
};
const resetError = (state, action) => {
    return updateObject(state, { error: null});
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_RESET_ERROR: return resetError(state, action);
        default:
            return state;
    }
};

export default reducer;