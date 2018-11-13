<template>
    <v-app  xs12 dark v-bind:style="styleObject" class='fullbackground'>
      <TheSetupView v-if ="showSetupView" v-on:setDevicePlan='setDevicePlan($event)'></TheSetupView>
      <DeviceSetup v-if ="showDeviceSetup"></DeviceSetup>
    </v-app>
</template>

<script>
import TheSetupView from '~/components/TheSetupElement/TheSetupView.vue'
import DeviceSetup from '~/components/DeviceSetup/DeviceSetup.vue'
export default {
  components: {
    TheSetupView,
    DeviceSetup
  },
  data () {
    return {
      styleObject: {
        'background-image': 'url("https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg?cs=srgb&dl=astronomy-cosmos-dark-733475.jpg&fm=jpg")'
      }
    }
  },
  computed: {
    showSetupView  () {
      if (this.$store.state.setupInfo.devicePlan === '') {
        return true
      } else {
        return false
      }
    },
    showDeviceSetup  () {
      if (!(this.showSetupView) && this.$store.state.setupInfo.thisdeviceInfo === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    setDevicePlan (plan) {
      this.$store.dispatch('updateDevicePlan', plan)
    }
  }
}

</script>

<style scoped>
.fullbackground {
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
}
</style>
