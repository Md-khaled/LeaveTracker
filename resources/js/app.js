import './bootstrap';

import {createApp} from 'vue/dist/vue.esm-bundler.js';
import Main from './components/IncrementCounter.vue';
// import router from '';
import { createPinia } from 'pinia';

const app = createApp({});
const pinia = createPinia();

app.component('app-component', Main);

// app.use(router);
app.use(pinia);

app.mount("#app");



