import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tasksserver.herokuapp.com'
});

export default instance;