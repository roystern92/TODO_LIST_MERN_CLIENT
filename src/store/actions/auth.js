import axios from '../../axios/axios-todo-lists';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};


export const checkAuthTimeout = (expirationTime) => {
    console.log("expirationTime " + expirationTime);
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


export const signUp = (email, password, name) => {
    return dispatch => {
        dispatch(authStart());
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        // formData.append('image', file);

        axios.post('/auth/signup', formData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresTimeInMiliseconds);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.userId);
                let timeToLogout = expirationDate.getTime() - new Date().getTime();
                dispatch(authSuccess(res.data.token, res.data.userId));
                dispatch(checkAuthTimeout(timeToLogout));
            }).catch(err => {
                console.log(err.response.data.err);
                dispatch(authFail(err.response.data));
            });
    }
};

export const authCheckState = () => {
    return dispatch => {
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
            }
        }
    };
};














