import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import {auth} from "./firebaseDB.js";

//onAuthStateChanged => method yang digunakan untuk mengetahui pengguna yang sedang login
auth.onAuthStateChanged(user => {
  store.dispatch(`FETCH_USER`, user);
});


Vue.use(VueToast);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
