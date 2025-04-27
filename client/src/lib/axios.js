import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Change this to your API base URL
    withCredentials: true, // Include credentials for CORS if needed
});