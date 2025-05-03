import axios from 'axios';

const URL = 'devapp-backend.railway.internal';

const api = axios.create({
    baseURL: `${URL}`
});

export default api;
