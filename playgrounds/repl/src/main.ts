import './main.css'

import { createApp } from 'vue'
import ui from 'pohon-ui/vue-plugin'
import App from './App.vue'

const app = createApp(App)
app.use(ui)
app.mount('#app')
