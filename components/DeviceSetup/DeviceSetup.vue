<template>
  <v-container justify-center fill-height>

    <PickDevice  v-on:pickOption='pickDevice($event,0)'
    v-if="shouldThisShow (0)">
    </PickDevice>

    <div v-for="index in menmonics" :key="index">
    <TheMenmonic  v-on:pickOption='pickDevice($event,0)'
    v-if="shouldThisShow (index)">
    </TheMenmonic>
    </div>

    <div v-for="index in menmonics" :key="index">
    <TheHardwareWallet  v-on:pickOption='choose($event,0)'
    v-if="shouldThisShow (index+menmonics)">
    </TheHardwareWallet>
    </div>

    <GenPass  v-on:pickOption='choose($event,0)'
    v-if="shouldThisShow (showGenPhrase)">
    </GenPass>


  </v-container>
</template>

<script>
import PickDevice from '~/components/DeviceSetup/PickDevice.vue'
import TheMenmonic from '~/components/DeviceSetup/TheMenmonic/Main.vue'
import TheHardwareWallet from '~/components/DeviceSetup/TheHardwareWallet/Main.vue'
import GenPass from '~/components/DeviceSetup/GeneratePasswords.vue'
export default {
  name: 'DeviceSetup',
  components: {
    PickDevice,
    TheMenmonic,
    TheHardwareWallet,
    GenPass
  },
  methods: {
    pickDevice (choice, index) {
      this.choiceArray.splice(index, 1, choice)
      this.currentView += 1
      this.setMenandHardware(choice)
    },
    shouldThisShow (index) {
      if (index === this.currentView) {
        return true
      } else {
        return false
      }
    },
    setMenandHardware (choice) {
      let device = this.devicePlan['device' + choice]
      if (device['type'] === 'cell') {
        this.menmonics += device['privatekey']
      } else if (device['type'] === 'lap') {
        this.menmonics += device['privatekey']
        this.hardware += device['hardwarewallets']
      }
    }
  },
  computed: {
    showGenPhrase () {
      if (this.currentView === 0) {
        return -1
      } else {
        return Number(2)
      }
    }
  },
  data () {
    return {
      choiceArray: [],
      currentView: 0,
      menmonics: 0,
      hardware: 0,
      devicePlan: this.$store.state.setupInfo.devicePlan
    }
  }

}


</script>

<style scoped>

</style>
