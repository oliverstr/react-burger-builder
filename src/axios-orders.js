import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-8d390.firebaseio.com/'
})

export default instance;