import axios from 'axios';

const PORT = 3000;
const URL = 'devapp-backend.railway.internal';

const api = axios.create({
    baseURL: `${URL}:${PORT}`
});

export default api;
