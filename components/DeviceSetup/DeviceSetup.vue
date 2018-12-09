<template>
  <v-container  fill-height>
    <v-layout row wrap align-center>

    <v-flex xs12 v-for="menmonic in menmonics" :key='menmonic.id'>
    <TheMenmonic  v-on:submitwordList='addToWord($event,menmonic)'
    v-on:back='back(menmonic-1)'
    v-if="shouldThisShow (menmonics-1)">
    </TheMenmonic>
    </v-flex>

    <v-flex xs12 v-for="index in hardware" :key='hardware.id'>
      <TheHardwareWallet v-bind:number="index" v-on:pickOption='setXpubsandType($event,index)'
      v-on:back='back(index+menmonics-1)'
      v-if="shouldThisShow (index+menmonics-1)">
      </TheHardwareWallet>
    </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import TheMenmonic from '~/components/DeviceSetup/TheMenmonic/Main.vue'
import TheHardwareWallet from '~/components/DeviceSetup/TheHardwareWallet/Main.vue'
import { getXpub } from '~/assets/Misc/deviceSetup.js'
import { entropy } from '~/assets/crypto/genEntropy.js'
export default {
  name: 'DeviceSetup',
  components: {
    TheMenmonic,
    TheHardwareWallet
  },
  methods: {
    async addToWord (memInfo, index) {
      this.currentView += 1
      this.choiceObject.menmonics['menmonic' + index] = memInfo.finalMenmonic
      this.choiceObject.passwordStrings['passwordString' + index] = memInfo.passWordString
      if (this.done) {
        await this.genPasswords()
        await this.proccessFinal()
      }
    },
    back (num) {
      if (num === 0) {
        let view = this.$store.state.mainView
        this.$store.dispatch('updateDevicePlan', '')
        this.$store.dispatch('updateMainView', view - 1)
      }
      this.currentView = this.currentView - 1
    },
    async setXpubsandType (data, index) {
      this.choiceObject.xpubs['xpub' + index] = data.xPubs
      this.choiceObject.typesofHardware['hardwareWallet' + index] = data.walletType
      this.currentView += 1
      if (this.done) {
        await this.genPasswords()
        await this.proccessFinal()
      }
    },
    shouldThisShow (index) {
      if (index === this.currentView) {
        return true
      } else {
        return false
      }
    },
    proccessFinal () {
      let publicInfo = {}
      let privateInfo = {}
      let finalObject = {}
      const xpubset = getXpub(this.choiceObject.menmonics)
      let view = this.$store.state.mainView

      publicInfo['serverIdentity'] = this.choiceObject.codeInfo.serverIdentity
      publicInfo['xpubsetMetal'] = xpubset
      publicInfo['xpubsethardware'] = this.choiceObject.xpubs
      publicInfo['passWordStrings'] = this.choiceObject.passwordStrings
      publicInfo['aesgcmPass'] = this.choiceObject.codeInfo.aesgcmPass

      privateInfo['menmonics'] = this.choiceObject.menmonics
      privateInfo['deviceNumber'] = this.choiceObject.deviceNumber
      privateInfo['typesofHardware'] = this.choiceObject.typesofHardware

      finalObject['privateInfo'] = privateInfo
      this.$store.dispatch('updatePublicInfo', publicInfo)
      this.$store.dispatch('updateThisDeviceInfo', finalObject)
      this.$store.dispatch('updateMainView', view + 1)
    },
    genPasswords () {
      let codestuff = {}
      codestuff['aesgcmPass'] = entropy(32)
      codestuff['serverIdentity'] = entropy(16)
      this.choiceObject.codeInfo = codestuff
    }
  },
  computed: {
    done () {
      let amountDone = this.menmonics + this.hardware
      if (this.currentView === amountDone) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      choiceObject: {},
      currentView: 0,
      menmonics: 2 - this.$store.state.setupInfo.devicePlan.hardware,
      hardware: this.$store.state.setupInfo.devicePlan.hardware,
      devicePlan: this.$store.state.setupInfo.devicePlan
    }
  },
  created () {
    this.choiceObject.menmonics = {}
    this.choiceObject.passwordStrings = {}
    this.choiceObject.xpubs = {}
    this.choiceObject.codeInfo = {}
    this.choiceObject.typesofHardware = {}
  }

}


</script>

<style scoped>

</style>
