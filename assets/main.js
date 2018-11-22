import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import Vuex from 'vuex'
import { store } from './store/store'

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')
