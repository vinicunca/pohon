import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ui from 'pohon-ui/vue-plugin'
import App from './App.vue'
import 'virtual:uno.css'

const app = createApp(App)

const router = createRouter({
  routes: [],
  history: createWebHistory()
})

app.use(router)
app.use(ui)

app.mount('#app')
