// Composables
import { createRouter, createWebHistory } from 'vue-router';

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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  scrollBehavior() { return { top: 0 } },
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
 
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  
  if (to.name === 'Pokemon') {
    const pokemonExists = store.pokemonMapList.has(to.params.name);
    if (pokemonExists) store.pokemonObjectClicked = store.pokemonMapList.get(to.params.name);
    else try {
      next();
      store.isLoading = true;
      store.pokemonClicked = (await axios.get(`${store.API_URL}/getPokemon?name=${to.params.name}`)).data;
      await store.fetchPokemonInfo();
      store.isLoading = false;
      return;
    } catch (err) {
      console.error(err);
      return next({ name: 'NotFound' });
    }
  }
  next();
});

export default router;
