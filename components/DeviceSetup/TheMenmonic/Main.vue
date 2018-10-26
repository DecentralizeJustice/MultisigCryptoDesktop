<template>

<Entermenmonic v-on:submitwordList='submitwordList($event)' v-if="shouldShow (0)">
</Entermenmonic>

</template>

<script>
import Entermenmonic from '~/components/DeviceSetup/TheMenmonic/Entermenmonic.vue'
import { combine2passphrases } from '~/assets/WordList/getWordIndex.js'
export default {
  name: 'TheMenmonic',
  components: {
    Entermenmonic
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    submitwordList (wordList) {
      // this.currentIndex += 1
      console.log(combine2passphrases(wordList))
    },
    shouldShow (index) {
      if (this.currentIndex === index) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
