import ui from 'pohon-ui/vue-plugin';
import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import 'virtual:uno.css';

const app = createApp(App);
app.use(ui);
app.mount('#app');
