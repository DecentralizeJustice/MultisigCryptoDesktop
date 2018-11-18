<template>
  <v-container  fill-height>
    <v-layout row wrap align-center>

    <PickDevice  v-on:pickOption='pickDevice($event)'
    v-if="shouldThisShow (0)">
    </PickDevice>

    <v-flex xs12 v-for="menmonic in menmonics" :key='menmonic.id'>
    <TheMenmonic  v-on:submitwordList='addToWord($event,menmonic)'
    v-if="shouldThisShow (menmonic)">
    </TheMenmonic>
    </v-flex>

    <v-flex xs12 v-for="index in hardware" :key='hardware.id'>
      <TheHardwareWallet  v-on:pickOption='setXpubs($event,index)'
      v-if="shouldThisShow (index+menmonics)">
      </TheHardwareWallet>
    </v-flex>

    <GenPass  v-on:subCodes='subCodes($event)'
    v-if="shouldThisShow (showGenPhrase)">
    </GenPass>

    </v-layout>
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
    addToWord (memInfo, index) {
      this.currentView += 1
      this.choiceObject.menmonics['menmonic' + index] = memInfo
    },
    setXpubs (xpubs, index) {
      this.currentView += 1
      this.choiceObject.xpubs['xpub' + index] = xpubs
    },
    pickDevice (choice) {
      this.currentView += 1
      this.setMenandHardware(choice)
      this.choiceObject['deviceNumber'] = choice
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
    },
    subCodes (codestuff) {
      this.currentView += 1
      this.choiceObject.codeInfo = codestuff
    }
  },
  computed: {
    showGenPhrase () {
      if (this.currentView === 0) {
        return 10
      } else {
        return Number(this.menmonics + this.hardware + 1)
      }
    }
  },
  data () {
    return {
      choiceObject: {},
      currentView: 0,
      menmonics: 0,
      hardware: 0,
      devicePlan: this.$store.state.setupInfo.devicePlan
    }
  },
  created () {
    this.choiceObject.menmonics = {}
    this.choiceObject.xpubs = {}
    this.choiceObject.codeInfo = {}
  }

}


</script>

<style scoped>

</style>
