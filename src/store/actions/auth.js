import axios from '../../axios/axios-todo-lists';
import * as actionTypes from './actionTypes';
import {fetchCurrentListHelper} from './index';

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


const setAuthTimeout = (expirationTime) => {
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


export const authUserProfile = (user) => {
    return{
        type: actionTypes.AUTH_USER_PROFILE,
        user: user
    }
}



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
        const res = await axios.post(url, formData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresTimeInMiliseconds);
        const timeToLogout = expirationDate.getTime() - new Date().getTime();



        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expirationDate', expirationDate);


        if (signUp) {
            await createMyDayList();
            fetchCurrentListHelper(dispatch, 'My Day');
        }else{
            await fetchCurrentListHelper(dispatch, 'My Day');
        }

        dispatch(authUserProfile(res.data.user));
        dispatch(setAuthTimeout(timeToLogout));
        dispatch(authSuccess(res.data.token, res.data.userId));
    } catch (e) {
        console.log(e.response);
        dispatch(authFail(e.response.data.message));
    }
}


export const auth = (email, password, name, signUp, gender) => {
    return dispatch => {
        dispatch(authStart());

        let url = '/auth/login';

        const formData = new FormData();

        if (signUp) {
            formData.append('name', name);
            formData.append('gender', gender);
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
                dispatch(setAuthTimeout(expirationDate.getTime() - new Date().getTime()));
                fetchProfile(dispatch);

            }
        }
    };
};


export const fetchUserProfile = () => {
    return  (dispatch) => {
        fetchProfile(dispatch);
    };
};

const fetchProfile = async (dispatch) => {
        try {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
            let res = await axios.get('/auth/profile');
            dispatch(authUserProfile(res.data.user));

        }catch (e) {
            console.log(e.response);
        }
};
















