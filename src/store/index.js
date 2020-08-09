import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance from '../configs/http-commons';

//import { resolve, reject } from 'core-js/fn/promise';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {}
    },

    mutations:{
        auth_request (state) {
            state.status = 'loading'
        },
        auth_success (state, token, user) {
            state.status = 'success',
            state.token = token,
            state.use = user
        },
        auth_error (state) {
            state.status = 'error'
          },
        logout (state) {
            state.status = ''
            state.token = ''
        }
    },

    actions:{
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axiosInstance.post("/users/signIn", user)
                    .then(response => {
                        const token = response.data.token
                        const user = response.data.user
                        localStorage.setItem('token', token)
                        axiosInstance.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },

        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axiosInstance.post("/users/signUp", user)
                    .then(response => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axiosInstance.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(error => {
                        commit('auth_error', error)
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },

        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },

    getters:{
        isLoggedIn: state => !!state.token,
        authStatus: state => status
    }
})