import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const light = {
  colors: {
    background: '#f6f8fc',
    primary: '#1867C0',
    secondary: '#5CBBF6',
    pokeball: '#000000',
    switch: '#ffe600',
    bg_switch: '#87ceeb'
  },
}

const dark = {
  dark: true,
  colors: {
    background: '#121212',
    primary: '#1867C0',
    secondary: '#5CBBF6',
    pokeball: '#ffffff',
    switch: '#ffffff',
    bg_switch: '#a3a3a3'
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
