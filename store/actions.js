export default {

  updateDevicePlan ({ commit }, deviceplan) {
    commit('updateDevicePlan', deviceplan)
  },
  updateThisDeviceInfo ({ commit }, deviceinfo) {
    commit('updateThisDeviceInfo', deviceinfo)
  },
  updateCurrentView ({ commit }, view) {
    commit('updateCurrentView', view)
  }
}
