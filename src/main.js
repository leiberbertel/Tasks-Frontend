import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import Header from './components/HeaderComp';
import Footer from './components/FooterComp';

axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App);
app.use(router);

app.component('header-nav', Header)
app.component('footer-tag', Footer)

app.mount('#app');

app.config.globalProperties.$axios = axios;