import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = () => {
  const store = defineStore('globalStore', {
    state: () => ({
      API_URL: import.meta.env.VITE_API_URL,
      typeList: [
        { title: 'All', icon: 'mdi-set-all', color: '' },
        { title: 'Normal', icon: 'mdi-account', color: '#aaaa99' },
        { title: 'Fire', icon: 'mdi-fire', color: '#ff4422' },
        { title: 'Water', icon: 'mdi-water', color: '#3399ff' },
        { title: 'Electric', icon: 'mdi-lightning-bolt', color: '#ffcc33' },
        { title: 'Grass', icon: 'mdi-grass', color: '#77cc55' },
        { title: 'Ice', icon: 'mdi-snowflake', color: '#66ccff' },
        { title: 'Fighting', icon: 'mdi-boxing-glove', color: '#bb5544' },
        { title: 'Poison', icon: 'mdi-bottle-tonic-skull', color: '#aa5599' },
        { title: 'Ground', icon: 'mdi-floor-plan', color: '#ddbb55' },
        { title: 'Flying', icon: 'mdi-bird', color: '#8899ff' },
        { title: 'Psychic', icon: 'mdi-star-four-points', color: '#ff5599' },
        { title: 'Bug', icon: 'mdi-ladybug', color: '#aabb22' },
        { title: 'Rock', icon: 'mdi-landslide', color: '#bbaa66' },
        { title: 'Ghost', icon: 'mdi-ghost', color: '#6666bb' },
        { title: 'Dark', icon: 'mdi-moon-full', color: '#775544' },
        { title: 'Dragon', icon: 'mdi-firefox', color: '#7766ee' },
        { title: 'Steel', icon: 'mdi-mine', color: '#aaaabb' },
        { title: 'Fairy', icon: 'mdi-butterfly', color: '#ee99ee' },
      ],
      genList: [
        { title: 'All', value: 'All', disabled: false, icon: 'mdi-set-all' },
        { title: 'First', value: '1', disabled: false, icon: 'mdi-roman-numeral-1' },
        { title: 'Second', value: '2', disabled: false, icon: 'mdi-roman-numeral-2' },
        { title: 'Third', value: '3', disabled: false, icon: 'mdi-roman-numeral-3' },
        { title: 'Fourth', value: '4', disabled: false, icon: 'mdi-roman-numeral-4' },
        { title: 'Fifth', value: '5', disabled: false, icon: 'mdi-roman-numeral-5' },
        { title: 'Sixth', value: '6', disabled: false, icon: 'mdi-roman-numeral-6' },
        { title: 'Seventh', value: '7', disabled: false, icon: 'mdi-roman-numeral-7' },
        { title: 'Eighth', value: '8', disabled: false, icon: 'mdi-roman-numeral-8' },
        { title: 'Ninth', value: '9', disabled: false, icon: 'mdi-roman-numeral-9' },
      ],
      orderList: [
        { title: 'Ascending', value: '1', icon: 'mdi-sort-numeric-ascending' },
        { title: 'Descending', value: '-1', icon: 'mdi-sort-numeric-descending' },
      ],
      initialParams: { 
        filterName: '', 
        types: ['All'], 
        gen: 'All', 
        order: '1' 
      },
      searchParams: { 
        filterName: '', 
        types: ['All'], 
        gen: 'All', 
        order: '1' 
      },
      pokemonList: [],
      pokemonListAll: [],
      pokemonListFiltered: [],
      pokemonMaps: new Map(),
      pokemonClicked: {},
      pokemonObjectClicked: {},
      typeDefenseList: {},
    }),
    actions: {
      async getTypeDefenseList() {
        this.typeDefenseList = (await axios.get(`${this.API_URL}/types`)).data;
      },
      async getAllPokemons() {
        this.pokemonListAll = (await axios.post(`${store.API_URL}/pokemons`, this.initialParams)).data.pokemons;
      },
      async fetchPokemonInfo() {
        const pokemon = this.pokemonClicked;
        const pokemonInfo = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)).data;
        const pokemonSpecies = (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)).data;
        const typeDefenses = await getPokemonMultipliers(pokemon, this.typeList, this.typeDefenseList);
        
        pokemonSpecies.flavor_text_entries = pokemonSpecies.flavor_text_entries.filter(item => item.language.name == 'en');
        pokemonSpecies.genera = pokemonSpecies.genera.filter(item => item.language.name == 'en');
    
        const pokemonObject = { 
          pokemon,
          pokemonInfo,
          pokemonSpecies,
          pokemonPrev: null,
          pokemonNext: null,
          typeDefenses
        };
    
        if (pokemon.id != 1) pokemonObject.pokemonPrev = (await axios.get(`${this.API_URL}/pokemon?id=${pokemon.id-1}`)).data;
        if (pokemon.id != 1010) pokemonObject.pokemonNext = (await axios.get(`${this.API_URL}/pokemon?id=${pokemon.id+1}`)).data;
        
        this.pokemonMaps.set(pokemon.name.toLowerCase(), pokemonObject);
        this.pokemonObjectClicked = pokemonObject;
      }
    }
  })();

  if (!Object.keys(store.typeDefenseList).length) store.getTypeDefenseList();

  if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));

  return store;
};