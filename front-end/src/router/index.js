import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GPA from '../views/GPA.vue'
import Species from '../views/Species.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gpa',
    name: 'GPA',
    component: GPA
  },
  {
    path: '/species',
    name: 'Species',
    component: Species
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
