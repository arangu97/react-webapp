import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dsm-project-aranguren.firebaseio.com/webApp'
});

export default instance;