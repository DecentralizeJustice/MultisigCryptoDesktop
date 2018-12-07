export default {

  updateDevicePlan ({ commit }, deviceplan) {
    commit('updateDevicePlan', deviceplan)
  },
  updateThisDeviceInfo ({ commit }, deviceinfo) {
    commit('updateThisDeviceInfo', deviceinfo)
  },
  updateMainView ({ commit }, view) {
    commit('updateMainView', view)
  }
}
