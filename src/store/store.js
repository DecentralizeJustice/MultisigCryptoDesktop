import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    firstTimeSetup: {
      showOpeningSetup: true
    }
  },
  mutations: {
    update (state, payLoad) {
      state[payLoad.nest1] = payLoad.status
    },
    update2prop (state, payLoad) {
      state[payLoad.nest1][payLoad.nest2] = payLoad.status
    }
  },
  actions: {
    update (context, payLoad) {
      context.commit('update', payLoad)
    },
    update2prop (context, payLoad) {
      context.commit('update2prop', payLoad)
    }
  }
})
