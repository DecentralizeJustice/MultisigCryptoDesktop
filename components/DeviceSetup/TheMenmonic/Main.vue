<template>

<Entermenmonic v-on:submitwordList='submitwordList($event)'
v-on:back='back(1)' v-if="shouldShow (0)">
</Entermenmonic>

<Confirm v-on:confirm='confirm($event)' v-else-if="shouldShow (1)"
v-on:back='back(2)'>
  <div slot='web'>{{finalMenmonic}}</div>
  <div slot='metal'>{{convertWordListToString(wordList)}}</div>
</Confirm>


</template>

<script>
import Entermenmonic from '~/components/DeviceSetup/TheMenmonic/Entermenmonic.vue'
import Confirm from '~/components/DeviceSetup/TheMenmonic/Confirm.vue'
import { makeBinaryWordList } from '~/assets/WordList/getWordIndex.js'
import { createWebWordlist } from '~/assets/WordList/createWebWordlist.js'
import { createFinalMenmonic } from '~/assets/WordList/createFinalMenmonic.js'
export default {
  name: 'TheMenmonic',
  components: {
    Entermenmonic,
    Confirm
  },
  data () {
    return {
      currentIndex: 0,
      wordList: {},
      webWordList: {},
      finalMenmonic: ''
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    submitwordList (wordList) {
      this.currentIndex += 1
      let binaryWordList = makeBinaryWordList(wordList)
      let webWordList = createWebWordlist()
      let webBinaryWordList = makeBinaryWordList((webWordList))
      let finalMenmonic = createFinalMenmonic(webBinaryWordList, binaryWordList)
      this.wordList = wordList
      this.webWordList = webWordList
      this.finalMenmonic = finalMenmonic
    },
    shouldShow (index) {
      if (this.currentIndex === index) {
        return true
      } else {
        return false
      }
    },
    confirm () {
      this.currentIndex += 1
      this.$emit('submitwordList', this.finalMenmonic)
    },
    back (index) {
      if (index === 1) {
        this.$emit('back')
      }
      if (index === 2) {
        this.currentIndex -= 1
      }
    },
    convertWordListToString (WordList) {
      let string = ''
      for (let i = 1; i < 13; i++) {
        string += WordList[i] + ' '
      }
      return string
    }
  }
}
</script>

<style scoped>

</style>
