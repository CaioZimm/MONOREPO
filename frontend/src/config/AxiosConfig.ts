import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const coinGeckoApi = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})