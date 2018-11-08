<template>
    <v-app  xs12 dark v-bind:style="styleObject"> >
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
  data () {
    return {
      styleObject: {
        'background-image': "url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=abstract-astro-astronomy-956999.jpg&fm=jpg')",
        'height': '100%',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      }
    }
  }
}

</script>
