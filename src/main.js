
import App from './App.vue'

import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.use(createPinia())

app.mount('#app')
