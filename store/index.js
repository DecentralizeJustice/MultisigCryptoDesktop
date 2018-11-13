import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: {
      setupInfo: {
        devicePlan: '',
        thisdeviceInfo: ''
      }

    },
    actions,
    mutations
  })
}

export default createStore
