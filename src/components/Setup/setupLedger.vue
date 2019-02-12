<template>

    <v-flex sm10 offset-sm1>

      <v-card >
        <v-card-title primary-title class="justify-center">
          <div>
            <h1 class="headline text-xs-center" >Hardware Wallet</h1>
          </div>
        </v-card-title>
        <v-divider light></v-divider>

        <div v-if="currentView == 0">
        <v-card-text class="justify-center">
          <h4 class="headline text-xs-center" >Follow the video below:</h4>
        </v-card-text>
        <div class="text-xs-center">
          <v-btn color="info" large v-if="true" v-on:click="next">Continue to Sync Wallet</v-btn>
        </div>
        </div>

        <div v-if="currentView == 1">
        <v-card-text class="justify-center">
          <h4 class="headline text-xs-center" >Insert Wallet To Setup</h4>
        </v-card-text>
        <div class="text-xs-center">
          <v-btn color="info" large v-if="true" v-on:click="setupLedgar">Setup Wallet</v-btn>
        </div>
        </div>

        <bottomBar @moveToNext="moveToNext" @back="back"
        v-bind="{ readyToContinue: readyToContinue, backOption: backOption }"/>
      </v-card>
    </v-flex>

</template>

<script>
import bottomBar from '@/components/Setup/bottomBar.vue'

import { getPublicKeyLegar } from '../../assets/ledger/main.js'
export default {
  name: 'setupLedger',
  components: {
    bottomBar
  },
  data: function () {
    return {
      currentView: 0,
      readyToContinue: false,
      xpubs: '',
      backOption: false
    }
  },
  methods: {
    next: function () {
      // insert content checks
      this.currentView += 1
      this.backOption = true
    },
    moveToNext: function () {
      this.$emit('xpubsDone', { xpubs: this.xpubs })
    },
    setupLedgar: async function () {
      let publickeys = await getPublicKeyLegar()
      if (publickeys.btc !== undefined) {
        this.xpubs = publickeys
        this.readyToContinue = true
      }
    },
    back: function () {
      this.readyToContinue = false
      if (this.currentView === 1) {
        this.backOption = false
      }
      if (this.currentView !== 0) {
        this.currentView = this.currentView - 1
      }
    }
  }
}
</script>

<style scoped>
.qrcode {
  width: 45%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
