// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    component: () => import('@/views/Pokedex.vue'),
  },
  {
    path: '/types',
    name: 'Types',
    component: () => import('@/views/Types.vue'),
  },
  {
    path: '/moves',
    name: 'Moves',
    component: () => import('@/views/Moves.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
