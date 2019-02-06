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

        <bottomBar @moveToNext="moveToNext" v-bind:readyToContinue="readyToContinue"/>
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
      xpubs: ''
    }
  },
  methods: {
    next: function () {
      // insert content checks
      this.currentView += 1
    },
    moveToNext: function () {
      this.$emit('til', { usageKey: this.usageKey })
    },
    setupWallet: function () {
      // insert content checks
      console.log('ready')
    },
    setupLedgar: async function () {
      let keys = await getPublicKeyLegar()
      this.xpubs = keys
      console.log(this.xpubs)
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
