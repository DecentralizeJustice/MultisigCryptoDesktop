<template>

    <v-flex sm10 offset-sm1>
      <img alt="Vue logo" src="./assets/logo.png">
      <v-card >
        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline text-xs-center" >Scan Usage Key</h3>
          </div>
        </v-card-title>
        <v-img
          src="https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          aspect-ratio="5"
          v-if="!scanning"
        ></v-img>
        <v-divider light v-if="scanning"/>
        <qrcodeScanner @scannedSuccess="processScanned" class="qrcode mt-2" fill-height v-if="scanning"/>
        <div class="text-xs-center">
          <v-btn color="info" large v-if="!scanning && !scanned" v-on:click="scan">Scan Code</v-btn>
          <v-btn color="error" large v-if="scanning" v-on:click="cancelscan">Cancel</v-btn>
        </div>
        <bottomBar @moveToNext="moveToNext" v-bind:readyToContinue="readyToContinue"/>
      </v-card>
    </v-flex>

</template>

<script>
import qrcodeScanner from '@/components/generalUtility/qrCodeScanner.vue'
import bottomBar from '@/components/Setup/bottomBar.vue'
export default {
  name: 'UsageKey',
  components: {
    qrcodeScanner,
    bottomBar
  },
  data: function () {
    return {
      scanning: false,
      scanned: false,
      readyToContinue: false,
      usageKey: ''
    }
  },
  methods: {
    processScanned: function (decodedString) {
      // insert content checks
      this.scanning = false
      this.scanned = true
      this.readyToContinue = true
      this.usageKey = decodedString
    },
    scan: function () {
      this.scanning = true
    },
    cancelscan: function () {
      this.scanning = false
    },
    moveToNext: function () {
      this.$emit('scanned', { usageKey: this.usageKey })
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
