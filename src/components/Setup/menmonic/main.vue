<template>

  <v-container justify-center fill-height fluid>
    <v-layout row wrap align-center>
      <v-flex sm8 offset-sm2>
        <v-card>
        <Entermenmonic v-on:submitwordList='submitwordList($event)'
        v-on:back='back' v-if="currentComponent == 0"/>

        <checkMetalMen v-on:passedTests='passedMetalTest($event)'
        v-on:back='back' v-on:failed='back' v-if="currentComponent == 1"
        v-bind="{ wordList: wordList }"/>

        <recordWebMen v-on:done='done()'
        v-on:back='back' v-bind="{webWordsObject:webWordsObject}"
        v-if="currentComponent == 2"/>

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
import recordWebMen from '@/components/Setup/menmonic/recordWebMen.vue'
import { createWebWordlist } from '@/assets/menmonic/createWebWordlist.js'
import { convertStringToObject } from '@/assets/menmonic/convertStringToObject.js'
// import { convertWordListToString } from '@/assets/menmonic/convertWordListToString.js'
// import { createFinalMenmonic } from '@/assets/menmonic/createFinalMenmonic.js'
export default {
  name: 'menmonicSetup',
  components: {
    Entermenmonic,
    checkMetalMen,
    recordWebMen,
    bottomBar
  },
  data () {
    return {
      currentComponent: 0,
      wordList: {},
      webWordlist: {},
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
    passedMetalTest (info) {
      this.currentComponent += 1
      // let passWordString = createWebWordlist()
      // let memString = this.convertWordListToString(this.wordList)
      // let finalMenmonic = createFinalMenmonic(memString, passWordString)
      // console.log(finalMenmonic)
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
    },
    done () {
      this.currentComponent += 1
    }
  },
  mounted: function () {
    const webWordStringTemp = createWebWordlist()
    this.webWordsObject = convertStringToObject(webWordStringTemp)
  }
}
</script>

<style scoped>

</style>
