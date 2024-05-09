import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;

//401,403(access 만기): refresh 한번 더
//isloggedin