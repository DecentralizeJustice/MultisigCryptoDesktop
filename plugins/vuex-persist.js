// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      storage: localforage
    }).plugin(store)
  })
}
