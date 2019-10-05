import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store/store'
import dateFilter from './filters/date.filter.js'
import currencyFilter from './filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import messagePlugin from './utils/message.plugin.js'
import titlePlugin from './utils/title.plugin'
import Loader from '@/components/app/Loader'
import Paginate from 'vuejs-paginate'
import tooltipDirective from '@/directives/tooltip.directive'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('localizeFilter', localizeFilter);
Vue.component('app-loader', Loader);
Vue.component('app-paginate', Paginate);
Vue.directive('tooltip', tooltipDirective);

const firebaseConfig = {
  apiKey: "AIzaSyD4jkgHmUYce3WTT-k8HqmnS089cM03f9s",
  authDomain: "vue-spa-crm.firebaseapp.com",
  databaseURL: "https://vue-spa-crm.firebaseio.com",
  projectId: "vue-spa-crm",
  storageBucket: "",
  messagingSenderId: "552870205563",
  appId: "1:552870205563:web:fddc07a99252b083a16ade"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      router,
      store
    }).$mount('#app')
  }
});


