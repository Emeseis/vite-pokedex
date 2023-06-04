import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const light = {
  colors: {
    background: '#f6f8fc',
    primary: '#1867C0',
    secondary: '#5CBBF6',
    pokeball: '#000'
  },
}

const dark = {
  dark: true,
  colors: {
    background: '#121212',
    primary: '#1867C0',
    secondary: '#5CBBF6',
    pokeball: '#fff'
  }
}

export default createVuetify({
  treeShake: true,
  theme: {
    options: { customProperties: true },
    themes: {
      light,
      dark
    },
  },
})
