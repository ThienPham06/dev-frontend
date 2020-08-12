import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '../configs/http-commons';

//import { resolve, reject } from 'core-js/fn/promise';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {},
        401: false
    },

    mutations:{
        auth_request (state) {
            state.status = 'loading'
        },
        auth_success (state, token, user) {
            state.status = 'success',
            state.token = token,
            state.user = user
        },
        auth_error (state) {
            state.status = 'error'
          },
        logout (state) {
            state.status = ''
            state.token = ''
        },
        unauth (state) {
            state.status = '401',
            state.token = ''
        }
    },

    actions:{
        login({commit}, user) {            
            // axiosInstance.post("/users/signIn",  user)
            //         .then(resp => {
            //             commit('auth_request')
            //             let token = resp.data.token
            //             let user = resp.data.user
            //             localStorage.setItem('token', token)
            //             axiosInstance.defaults.headers.common['Authorization'] = token
            //             commit('auth_success', token, user)
            //         })
            //         .catch(err => {
            //             commit('auth_error')
            //             localStorage.removeItem('token')
            //             console.log(err) 
            //         }) 
            
            
            

            return new Promise((resolve, reject) => {
                commit('auth_request');
                axiosInstance.post("/users/signIn",  user)
                    .then(resp => {
                        let resData = resp.data;
                        // let token = resData.data.token;
                        // let user = resData.data.user;
                        localStorage.setItem('token', resData.data.token);
                        axiosInstance.defaults.headers.common['Authorization'] = resData.data.token;
                        commit('auth_success', resData.data.token,  resData.data.user);     
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
                        let resData = resp.data;
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
                localStorage.removeItem('token')
                delete axiosInstance.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },

    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => status
    }
})