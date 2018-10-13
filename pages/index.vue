<template>
    <v-app  dark>
      <TheSetupView v-if ="this.$store.state.setupInfo.showDevicePlan"></TheSetupView>
      <DeviceSetup v-if ="this.$store.state.setupInfo.showDeviceSetup"></DeviceSetup>
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
  }

</script>
