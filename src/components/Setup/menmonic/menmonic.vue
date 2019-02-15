<template>

<Entermenmonic v-on:submitwordList='submitwordList($event)'
v-on:back='back(1)' v-if="shouldShow (0)">
</Entermenmonic>

<Confirm v-on:confirm='confirm($event)' v-else-if="shouldShow (1)"
v-on:back='back(2)'>
  <div slot='web'>{{webWordList}}</div>
  <div slot='metal'>{{convertWordListToString(wordList)}}</div>
</Confirm>

</template>

<script>
import Entermenmonic from '@/components/Setup/menmonic/enterMen.vue'
import Confirm from '@/components/Setup/menmonic/confirm.vue'
import { createWebWordlist } from '@/assets/menmonic/createWebWordlist.js'
import { createFinalMenmonic } from '@/assets/menmonic/createFinalMenmonic.js'
export default {
  name: 'TheMetalMenmonic',
  components: {
    Entermenmonic,
    Confirm
  },
  data () {
    return {
      currentIndex: 0,
      wordList: {},
      webWordList: {},
      finalMenmonic: '',
      passWordString: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    submitwordList (wordList) {
      let passWordString = createWebWordlist()
      let memString = this.convertWordListToString(wordList)
      let finalMenmonic = createFinalMenmonic(memString, passWordString)
      this.wordList = wordList
      this.webWordList = passWordString
      this.finalMenmonic = finalMenmonic
      this.passWordString = passWordString
      this.currentIndex += 1
    },
    shouldShow (index) {
      if (this.currentIndex === index) {
        return true
      } else {
        return false
      }
    },
    confirm () {
      let memInfo = {}
      memInfo['finalMenmonic'] = this.finalMenmonic
      memInfo['passWordString'] = this.passWordString
      this.$emit('submitwordList', memInfo)
      this.currentIndex += 1
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
