import { createApp } from 'vue'
import App from './App.vue'
import Router from './router';
import store from "./store";
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
    .use(store)
    .use(Router, VueAxios, axios)
    .mount('#app')
