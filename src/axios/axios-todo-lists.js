import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

if( localStorage.getItem('token')){
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
}

export default instance;