<template>

  <v-container justify-center fill-height fluid>
            <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
    <v-layout row wrap align-center>
      <UsageKey @scanned="processScanned" v-if="currentComponent == 0" fill-height/>
      <setupLedger v-if="currentComponent == 1"/>
    </v-layout>
  </v-container>

</template>

<script>
// @ is an alias to /src

import UsageKey from '@/components/Setup/UsageKey.vue'
export default {
  name: 'setup',
  components: {
    UsageKey
  },
  data () {
    return {
      styleObject: {
        'background-image': 'url(/stars.jpg)'
      },
      currentComponent: 0,
      information: {}
    }
  },
  methods: {
    processScanned: function (newInfo) {
      this.currentComponent += 1
      this.information = Object.assign(newInfo, this.information)
    }
  }
}
</script>

<style scoped>

</style>
