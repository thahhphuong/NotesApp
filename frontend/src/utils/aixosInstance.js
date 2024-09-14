import axios from "axios"
import { BASE_URL } from "./constants";
const axisoInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});
// Add a request interceptor
axisoInstance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem("token")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axisoInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const messageError = error?.response?.data
    if (messageError) {
        return Promise.reject(messageError);
    }
    return Promise.reject(error);
});
export default axisoInstance