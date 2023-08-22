// import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import QrReader from 'vue3-qr-reader';
import App from './App.vue';
import router from './router';
import '@/assets/css/reset.css';
const app = createApp(App);

app.use(QrReader);
app.use(createPinia());
app.use(router);

app.mount('#app');
