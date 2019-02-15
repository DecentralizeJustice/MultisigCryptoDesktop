<template>

  <v-container justify-center fill-height fluid>

    <v-layout row wrap align-center>
      <TheMetalMenmonic @scanned="done" v-if="currentComponent == 0" fill-height/>

    </v-layout>
  </v-container>

</template>

<script>
// @ is an alias to /src
import TheMetalMenmonic from '@/components/Setup/menmonic/menmonic.vue'
export default {
  name: 'menmonicSetup',
  components: {
    TheMetalMenmonic
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
