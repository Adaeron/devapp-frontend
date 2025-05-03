import axios from 'axios';

const URL = 'devapp-backend-production.up.railway.app:3000';

const api = axios.create({
    baseURL: `${URL}`
});

export default api;
