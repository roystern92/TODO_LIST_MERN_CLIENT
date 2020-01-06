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
    localStorage.removeItem('userEmail');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};



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

    return axios.post('/admin/list', formData);

};



export const postAuth = async (formData, url, signUp, dispatch) => {

    try {
        let res = await axios.post(url, formData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresTimeInMiliseconds);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userFullName', res.data.user.name);
        localStorage.setItem('userEmail', res.data.user.email);
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















