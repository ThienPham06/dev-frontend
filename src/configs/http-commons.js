import axios from "axios";
import store from '../store'

const devInstance = "http://localhost:4000/";
const mockInstance = "https://5f43d67f75bded001695e586.mockapi.io/";
//const productionInstance = createInstance("http://localhost:8080/"); // will change later

let axiosInstance = axios.create({
    baseURL: devInstance,
    //baseURL: mockInstance,
    timeout:100000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    }
});

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})  

// axiosInstance.interceptors.response.use(function (response) {
//     return Promise.resolve(response)
//   }, function (error) {
//     if (error.response.status === 401) {
//         store.dispatch('unauth')
//     }
//     return Promise.reject(error)
//   })

export default axiosInstance;