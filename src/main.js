import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import vuetify from "./plugins/vuetify";
import firebase from 'firebase';
import {currency} from './currency';
// import { firestorePlugin } from 'vuefire'
// Vue.use(firestorePlugin)
Vue.filter('currency',currency)
var firebaseConfig = {
  apiKey: "AIzaSyCnbLvjdaD3913zvILNbMqUEW4oHhHxV64",
  authDomain: "proven-system-311401.firebaseapp.com",
  projectId: "proven-system-311401",
  storageBucket: "proven-system-311401.appspot.com",
  messagingSenderId: "990780560978",
  appId: "1:990780560978:web:ee30914ea83c60077fb18b",
  measurementId: "G-0RDE62T248",
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  firebase,
  render: (h) => h(App),
  created (){

  }
}).$mount("#app");
