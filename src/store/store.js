import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    showOpeningCoinPick: true
  },
  mutations: {
    hide (state) {
      state.showOpeningCoinPick = false
    }
  },
  actions: {
    hide (context) {
      context.commit('hide')
    }
  }
})
