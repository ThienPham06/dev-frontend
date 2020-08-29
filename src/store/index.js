import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '../configs/http-commons';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        401: false,
        fullname: localStorage.getItem('fullname') || ''
    },

    mutations:{
        test(state, test) {
            state.test = test
        }
        ,
        auth_request (state) {
            state.status = 'loading'
        },
        auth_success (state, {token, fullname}) {
            state.status = 'success'
            state.token = token
            state.fullname = fullname
        },
        authFB_success (state, token) {
            state.status = 'success'
            state.token = token
        },
        auth_error (state) {
            state.status = 'error'
          },
        logout (state) {
            state.status = ''
            state.token = ''
        },
        unauth (state) {
            state.status = '401'
            state.token = ''
        }
    },

    actions:{
        login({commit}, user) {            
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axiosInstance.post("/users/signIn",  user)
                    .then(resp => {
                        let token = resp.data.token;
                        let fullname = resp.data.user.fullname;
                        localStorage.setItem('token', token);
                        axiosInstance.defaults.headers.common['Authorization'] = token;
                        commit('auth_success',{ token, fullname});  
                        resolve(resp)
                    })
                    .catch(err => {
                        if(err.response.status === 401){
                            commit('unauth')
                        }else
                            commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err)                    
                    })                   
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axiosInstance.post("/users/signUp", user)
                    .then(resp => {
                        //let resData = resp.data;
                        // const token = resp.data.token
                        // const user = resp.data.user
                        // localStorage.setItem('token', resData.data.token)
                        // axiosInstance.defaults.headers.common['Authorization'] = resData.data.token
                        // commit('auth_success', resData.data.token, resData.data.user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.clear()
                delete axiosInstance.defaults.headers.common['Authorization']
                resolve()
            })
        },
        loginWithFacebook({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axiosInstance.post("/users/auth/facebook", user)
                    .then(resp =>{
                        localStorage.setItem('token', resp.data.token);
                        axiosInstance.defaults.headers.common['Authorization'] = resp.data.token;
                        commit('auth_success', resp.data.token, resp.data.user);     
                        resolve(resp)
                    })
                    .catch(err =>{
                        commit('auth_error');
                        localStorage.removeItem('token');
                        reject(err) 
                    })
            })
        }
    },

    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => status,
        loggedUser: state => state.fullname
    }
})