// =========================================================
// * Vue Material Dashboard - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from './store';
import axios from '../src/configs/http-commons';
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

import HttpCommon from './configs/http-commons';

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// configure router
const router = new VueRouter({
  mode:"history",
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next('/')
  }else{
    next()
  }
});

Vue.prototype.$Chartist = Chartist;
Vue.prototype.$store = store

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(HttpCommon);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
