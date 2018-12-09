<template>
    <v-app  xs12 dark v-bind:style="styleObject" class='fullbackground'>
      <TheSetupView v-if ="shouldThisShow(0)" ></TheSetupView>
      <DeviceSetup v-if ="shouldThisShow(1)"></DeviceSetup>
      <SyncMain v-if ="shouldThisShow(2)"></SyncMain>
    </v-app>
</template>

<script>
import TheSetupView from '~/components/TheSetupElement/TheSetupView.vue'
import DeviceSetup from '~/components/DeviceSetup/DeviceSetup.vue'
import SyncMain from '~/components/SyncAccounts/Main.vue'

export default {
  components: {
    TheSetupView,
    DeviceSetup,
    SyncMain
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
