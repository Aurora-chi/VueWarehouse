import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/index.vue"
import UserMain from "../views/main/index.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: "/main",
    name: "main",
    component: UserMain
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
