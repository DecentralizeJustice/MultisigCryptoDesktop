
export default {

  updateDevicePlan (state, deviceplan) {
    state.setupInfo.devicePlan = deviceplan
  },
  updateThisDeviceInfo (state, deviceinfo) {
    state.setupInfo.thisdeviceInfo = deviceinfo
  },
  updateMainView (state, view) {
    state.mainView = view
  }
}
