/* eslint-disable no-unused-vars */
// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js';

// Import App Component
import App from './App';

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAcu0OJwesoR8NZDTY_h6Tvhu7SnZ7Poxs',
        libraries: 'geometry'
    }
});

import {initializeApp} from 'firebase/app';
console.log("Iniciando Firebase")
var config = {
  apiKey: "AIzaSyChkm5Cly2Jno10oWIZt0_gg1ATeEaIqvE",
  authDomain: "auth-24699.firebaseapp.com",
  databaseURL: "https://auth-24699.firebaseio.com",
  projectId: "auth-24699",
  storageBucket: "auth-24699.appspot.com",
  messagingSenderId: "738208412998"
};
initializeApp(config);
console.log("Firebase Iniciado")

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);

//Vue.component("my-admob", require("./components/Admob.vue"));

import {store} from './store/store';

// Init App
const baseApp = new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  }
});
