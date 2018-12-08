<template>
    <v-app  xs12 dark v-bind:style="styleObject" class='fullbackground'>
      <TheSetupView v-if ="shouldThisShow(0)" v-on:setDevicePlan='setDevicePlan($event)'></TheSetupView>
      <DeviceSetup v-if ="shouldThisShow(1)"></DeviceSetup>
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
  },
  methods: {
    setDevicePlan (plan) {
      let view = this.$store.state.mainView
      this.$store.dispatch('updateDevicePlan', plan)
      this.$store.dispatch('updateMainView', view + 1)
    },
    shouldThisShow  (index) {
      if (this.$store.state.mainView === index) {
        return true
      } else {
        return false
      }
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
