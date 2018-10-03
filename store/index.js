import Vuex from 'vuex'
import  mutations from './mutations'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    actions,
    mutations
  })
}

export default createStore
