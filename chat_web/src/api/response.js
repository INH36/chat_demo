import axios from "axios";

const response = axios.create({
    baseURL:"http://localhost:3000", // 基础路径
    timeout: 5000
})

// 请求拦截器
response.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截器
response.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
})
export default response;