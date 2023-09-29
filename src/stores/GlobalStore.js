import { defineStore } from "pinia";

export const useStore = () => {
  const store = defineStore('globalStore', {
    state: () => ({
      API_URL: import.meta.env.VITE_API_URL,
      typeDefenseList: {},
      typeList: [
        { title: 'All', icon: 'mdi-set-all' },
        { title: 'Normal', icon: 'mdi-account' },
        { title: 'Fire', icon: 'mdi-fire' },
        { title: 'Water', icon: 'mdi-water' },
        { title: 'Electric', icon: 'mdi-lightning-bolt' },
        { title: 'Grass', icon: 'mdi-grass' },
        { title: 'Ice', icon: 'mdi-snowflake' },
        { title: 'Fighting', icon: 'mdi-boxing-glove' },
        { title: 'Poison', icon: 'mdi-bottle-tonic-skull' },
        { title: 'Ground', icon: 'mdi-floor-plan' },
        { title: 'Flying', icon: 'mdi-bird' },
        { title: 'Psychic', icon: 'mdi-star-four-points' },
        { title: 'Bug', icon: 'mdi-ladybug' },
        { title: 'Rock', icon: 'mdi-landslide' },
        { title: 'Ghost', icon: 'mdi-ghost' },
        { title: 'Dark', icon: 'mdi-moon-full' },
        { title: 'Dragon', icon: 'mdi-firefox' },
        { title: 'Steel', icon: 'mdi-mine' },
        { title: 'Fairy', icon: 'mdi-butterfly' },
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
      ]
    }),
    actions: {
      async getTypeDefenseList() {
        this.typeDefenseList = (await axios.get(`${this.API_URL}/types`)).data;
      }
    }
  })();

  if (!Object.keys(store.typeDefenseList).length) store.getTypeDefenseList();

  return store;
};