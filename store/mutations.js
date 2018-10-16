
export default {

  updateDevicePlan (state, deviceplan) {
    state.setupInfo.finalDevicePlan = deviceplan
  },
  hideDevicePlan (state, deviceplan) {
    state.setupInfo.showDevicePlan = false
  },
  showDeviceSetup (state, deviceplan) {
    state.setupInfo.showDeviceSetup = true
  }

}
