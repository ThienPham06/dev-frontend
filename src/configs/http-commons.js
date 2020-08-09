import axios from "axios";
import Vue from 'vue'

const devInstance = "http://localhost:4000";
//const productionInstance = createInstance("http://localhost:8080/"); // will change later

let axiosInstance = axios.create({
    baseURL: devInstance,
    timeout:100000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
    }
});

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})

axiosInstance.interceptors.response.use(undefined, function (err) {
    return new Promise((resolve, reject) => {
        if(err.status === 401 && err.config && !err.config.__isRetryRequest){
            this.$store.dispatch('logout')
        }
        throw err;
    });
});  

export default axiosInstance;