import axios from 'axios';

const URL = 'https://devapp-backend-production.up.railway.app';

const api = axios.create({
    baseURL: `${URL}`
});

export default api;
