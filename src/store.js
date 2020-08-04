import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },

    mutations: {

    },

    actions: {

    },

    getters: {

    }
});