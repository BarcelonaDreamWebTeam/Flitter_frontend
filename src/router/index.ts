import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HandleForgotPassword from '../views/HandleForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: HandleForgotPassword,
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: ResetPassword,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true }

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;


