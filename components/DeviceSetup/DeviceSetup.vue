<template>
  <v-container  fill-height>
    <v-layout row wrap align-center>

    <PickDevice  v-on:pickOption='pickDevice($event)'
    v-on:back='back(-1)'
    v-if="shouldThisShow (0)">
    </PickDevice>

    <v-flex xs12 v-for="menmonic in menmonics" :key='menmonic.id'>
    <TheMenmonic  v-on:submitwordList='addToWord($event,menmonic)'
    v-on:back='back(menmonics)'
    v-if="shouldThisShow (menmonic)">
    </TheMenmonic>
    </v-flex>

    <v-flex xs12 v-for="index in hardware" :key='hardware.id'>
      <TheHardwareWallet v-bind:number="index" v-on:pickOption='setXpubsandType($event,index)'
      v-on:back='back(index+menmonics)'
      v-if="shouldThisShow (index+menmonics)">
      </TheHardwareWallet>
    </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import PickDevice from '~/components/DeviceSetup/PickDevice.vue'
import TheMenmonic from '~/components/DeviceSetup/TheMenmonic/Main.vue'
import TheHardwareWallet from '~/components/DeviceSetup/TheHardwareWallet/Main.vue'
import { getXpub } from '~/assets/Misc/deviceSetup.js'
import { entropy } from '~/assets/crypto/genEntropy.js'
export default {
  name: 'DeviceSetup',
  components: {
    PickDevice,
    TheMenmonic,
    TheHardwareWallet
  },
  methods: {
    addToWord (memInfo, index) {
      this.currentView += 1
      this.choiceObject.menmonics['menmonic' + index] = memInfo.finalMenmonic
      this.choiceObject.passwordStrings['passwordString' + index] = memInfo.passWordString
    },
    back (num) {
      if (num === -1) {
        this.$store.dispatch('updateDevicePlan', '')
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
    pickDevice (choice) {
      this.setMenandHardware(choice)
      this.choiceObject['deviceNumber'] = choice
      this.currentView += 1
    },
    shouldThisShow (index) {
      if (index === this.currentView) {
        return true
      } else {
        return false
      }
    },
    setMenandHardware (choice) {
      const device = this.devicePlan['device' + choice]
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
      this.proccessFinal()
    },
    proccessFinal () {
      let publicInfo = {}
      let privateInfo = {}
      let finalObject = {}
      const xpubset = getXpub(this.choiceObject.menmonics)

      publicInfo['serverIdentity'] = this.choiceObject.codeInfo.serverIdentity
      publicInfo['xpubsetMetal'] = xpubset
      publicInfo['xpubsethardware'] = this.choiceObject.xpubs
      publicInfo['passWordStrings'] = this.choiceObject.passwordStrings

      privateInfo['aes-gcmPass'] = this.choiceObject.codeInfo['aes-gcmPass']
      privateInfo['menmonics'] = this.choiceObject.menmonics
      privateInfo['deviceNumber'] = this.choiceObject.deviceNumber
      privateInfo['typesofHardware'] = this.choiceObject.typesofHardware

      finalObject['publicInfo'] = publicInfo
      finalObject['privateInfo'] = privateInfo
      console.log(finalObject)
      this.$store.dispatch('updateThisDeviceInfo', finalObject)
    },
    genPasswords () {
      let codestuff = {}
      codestuff['aes-gcmPass'] = entropy(32)
      codestuff['serverIdentity'] = entropy(16)
      this.choiceObject.codeInfo = codestuff
    }
  },
  computed: {
    done () {
      let amountDone = this.menmonics + this.hardware + 1
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
      menmonics: 0,
      hardware: 0,
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
