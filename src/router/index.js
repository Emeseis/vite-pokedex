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
    path: '/pokedex/:name',
    name: 'Pokemon',
    component: () => import('@/views/PokemonInfo.vue'),
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
  {
    path: '/notfound',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
 
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  
  if (to.name === 'Pokemon') {
    const pokemonExists = store.pokemonMaps.has(to.params.name);
    if (pokemonExists) store.pokemonObjectClicked = store.pokemonMaps.get(to.params.name);
    else try {
      store.pokemonClicked = (await axios.get(`${store.API_URL}/pokemon?name=${to.params.name}`)).data;
      store.fetchPokemonInfo();
    } catch (err) {
      console.error(err);
      return next('/notfound');
    }
  }
  next();
})

export default router

