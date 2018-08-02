import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    showOpeningCoinPick: true
  },
  mutations: {
    hide (state, newStatus) {
      state.showOpeningCoinPick = newStatus
    }
  },
  actions: {
    hide (context, payload) {
      context.commit('hide', payload)
    }
  }
})
