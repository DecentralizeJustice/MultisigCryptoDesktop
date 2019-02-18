<template>

  <v-container justify-center fill-height fluid>

    <v-layout row wrap align-center>
      <Entermenmonic v-on:submitwordList='submitwordList($event)'
      v-on:back='back(1)' v-if="currentComponent == 0" fill-height/>
    </v-layout>
  </v-container>

</template>

<script>
import Entermenmonic from '@/components/Setup/menmonic/enterMen.vue'
import { createWebWordlist } from '@/assets/menmonic/createWebWordlist.js'
import { createFinalMenmonic } from '@/assets/menmonic/createFinalMenmonic.js'
export default {
  name: 'menmonicSetup',
  components: {
    Entermenmonic
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
    done: function (newInfo) {
      this.currentComponent += 1
      this.information = Object.assign(newInfo, this.information)
      // console.log(this.information)
    }
  }
}
</script>

<style scoped>

</style>
