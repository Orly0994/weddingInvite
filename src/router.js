import { createWebHistory, createRouter } from 'vue-router'

import Guest from './pages/Guest.vue'
import List from './pages/List.vue'

const routes = [
  { path: '/', component: Guest },
  { path: '/list', component: List },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
