
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Router from 'vue-router';
import Vue from "vue";

Vue.use(Router);

const routes = [

      {
        path: "/",
        name: "Login",
        component: Login
      },
      {
        path: "/register",
        name: "Register",
        component: Register
      },
      {
        path: "/layout",
        name: "Layout",
        // meta: {
        //   requiresAuth: true
        // },
        component: DashboardLayout,
        children:[
          {
            path: "dashboard",
            name: "Dashboard",
            component: Dashboard
          },
          {
            path: "user",
            name: "User Profile",
            component: UserProfile
          },
          {
            path: "table",
            name: "Table List",
            component: TableList
          },
          {
            path: "typography",
            name: "Typography",
            component: Typography
          },
          {
            path: "icons",
            name: "Icons",
            component: Icons
          },
          {
            path: "maps",
            name: "Maps",
            meta: {
              hideFooter: true
            },
            component: Maps
          },
          {
            path: "notifications",
            name: "Notifications",
            component: Notifications
          },
          {
            path: "upgrade",
            name: "Upgrade to PRO",
            component: UpgradeToPRO
          }
        ]
      }
];

export default routes;

