
export default {

  updateDevicePlan (state, deviceplan) {
    state.setupInfo.devicePlan = deviceplan
  },
  updateThisDeviceInfo (state, deviceinfo) {
    state.setupInfo.thisdeviceInfo = deviceinfo
  },
  updateCurrentView (state, view) {
    state.currentView = view
  }
}
