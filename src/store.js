import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  plugins: [createPersistedState()],
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})
