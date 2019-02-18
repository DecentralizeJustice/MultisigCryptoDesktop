<template>

  <v-container justify-center fill-height fluid>
    <v-layout row wrap align-center>
      <v-flex sm8 offset-sm2>
        <v-card>
        <Entermenmonic v-on:submitwordList='submitwordList($event)'
        v-on:back='back(1)' v-if="currentComponent == 0"/>

        <checkMetalMen v-on:passedTests='done($event)'
        v-on:back='back(1)' v-on:failed='back(1)' v-if="currentComponent == 1"
        v-bind="{ wordList: wordList }"/>

        <bottomBar @back="back"
        v-bind="{ readyToContinue: readyToContinue, backOption: isBack }"/>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>

</template>

<script>
import Entermenmonic from '@/components/Setup/menmonic/enterMen.vue'
import checkMetalMen from '@/components/Setup/menmonic/checkMetalMen.vue'
import bottomBar from '@/components/Setup/bottomBar.vue'
// import { createWebWordlist } from '@/assets/menmonic/createWebWordlist.js'
// import { createFinalMenmonic } from '@/assets/menmonic/createFinalMenmonic.js'
export default {
  name: 'menmonicSetup',
  components: {
    Entermenmonic,
    checkMetalMen,
    bottomBar
  },
  data () {
    return {
      currentComponent: 0,
      wordList: {},
      readyToContinue: false,
      backOption: false
    }
  },
  computed: {
    isBack: function () {
      if (this.currentComponent === 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    done: function (newInfo) {
      this.currentComponent += 1
      this.information = Object.assign(newInfo, this.information)
      // console.log(this.information)
    },
    submitwordList (wordList) {
      this.wordList = wordList
      this.currentComponent += 1
      this.backOption = true
    },
    back () {
      if (this.currentComponent !== 0) {
        this.currentComponent -= 1
      }
    }
  }
}
</script>

<style scoped>

</style>
