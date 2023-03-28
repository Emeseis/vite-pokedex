import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const light = {
  colors: {
    background: '#fff0', // transparent does not work here, for background use $application-background on variables.scss
    primary: '#1867C0',
    secondary: '#5CBBF6',
  },
}

const customTheme = {
  colors: {
    primary: '#1867C0',
    secondary: '#5CBBF6',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      customTheme
    },
  },
})
