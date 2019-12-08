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
        token:token,
        userId: userId
    };
};


// export const authLogout = () => {
//     return {
//         type: actionTypes.AUTH_LOGOUT
//     };
// };


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
                const expirationDate = new Date(new Date().getTime() + res.expiresTimeInMiliseconds);
                localStorage.setItem('token', res.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.userId);
                dispatch(authSuccess(res.token, res.userId));
            }).catch(err => {
                console.log(err.response.data.err);
                dispatch(authFail(err.response.data));
            });
    }
};


