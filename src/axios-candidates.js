import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://personio-fe-test.herokuapp.com'
});

export default instance;