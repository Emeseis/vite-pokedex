import { defineStore, acceptHMRUpdate } from "pinia";

export const useStore = () => {
  const store = defineStore('globalStore', {
    state: () => ({
      API_URL: import.meta.env.VITE_API_URL,
      isLoading: false,
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
        { title: 'Ascending', value: 'asc', icon: 'mdi-sort-numeric-ascending' },
        { title: 'Descending', value: 'desc', icon: 'mdi-sort-numeric-descending' },
      ],
      abilityDefenseList: {
        fluffy: [{ type: 'fire', value: 2 }],
        purifying_salt: [{ type: 'ghost', value: 0.5 }],
        heatproof: [{ type: 'fire', value: 0.5 }],
        water_bubble: [{ type: 'fire', value: 0.5 }],
        thick_fat: [{ type: 'fire', value: 0.5 }, { type: 'ice', value: 0.5 }],
        earth_eater: [{ type: 'ground', value: 0 }],
        levitate: [{ type: 'ground', value: 0 }],
        flash_fire: [{ type: 'fire', value: 0 }],
        well_baked_body: [{ type: 'fire', value: 0 }],
        dry_skin: [{ type: 'fire', value: 1.25 }, { type: 'water', value: 0 }],
        storm_drain: [{ type: 'water', value: 0 }],
        water_absorb: [{ type: 'water', value: 0 }],
        sap_sipper: [{ type: 'grass', value: 0 }],
        lightning_rod: [{ type: 'electric', value: 0 }],
        motor_drive: [{ type: 'electric', value: 0 }],
        volt_absorb: [{ type: 'electric', value: 0 }],
        wonder_guard: [{}],
        delta_stream: [{}]
      },     
      typeDefenseList: {},
      defaultSearchParams: { 
        filterName: '', 
        types: ['All'], 
        gen: 'All', 
        order: 'asc' 
      },
      searchParams: { 
        filterName: '', 
        types: ['All'], 
        gen: 'All', 
        order: 'asc' 
      },
      pokemonMapList: new Map(),
      pokemonList: [],
      pokemonListFiltered: [],
      allPokemonsList: [],
      pokemonClicked: {},
      pokemonObjectClicked: {},
    }),
    actions: {
      async getTypeDefenseList() {
        this.typeDefenseList = (await axios.get(`${this.API_URL}/getTypes`)).data;
      },
      async getAllPokemons() {
        this.allPokemonsList = (await axios.post(`${this.API_URL}/getPokemons`, this.defaultSearchParams)).data.pokemons;
      },
      async fetchPokemonInfo() {
        const pokemon = (await axios.get(`${this.API_URL}/getPokemonInfo?id=${this.pokemonClicked.id}`)).data;
        this.pokemonMapList.set(pokemon.pokemon.name, pokemon);
        this.pokemonObjectClicked = pokemon;
      }
    }
  })();

  if (!Object.keys(store.typeDefenseList).length) store.getTypeDefenseList();

  if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));

  return store;
};