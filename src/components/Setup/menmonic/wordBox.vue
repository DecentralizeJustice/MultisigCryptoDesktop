<template>

  <v-flex xs12 sm6 md3>
    <v-text-field
      :label='number'
      :outline='true' v-model="thisWord" v-on:keyup="checkText (thisWord)"
    >
    <v-fade-transition slot="append">
      <v-icon v-if="tempDone">check_circle</v-icon>
      <v-icon v-else>error</v-icon>
    </v-fade-transition>

    </v-text-field>
  </v-flex>

</template>

<script>
import { getWord } from '@/assets/menmonic/getWord.js'
export default {
  data () {
    return {
      thisWord: this.word,
      tempDone: false
    }
  },
  name: 'wordBox',
  props: ['number', 'word', 'done'],
  computed: {
  },
  mounted () {
    this.tempDone = this.done // I'm text inside the component.
  },
  methods: {
    updateWord (option) {
      this.$emit('updateWord', option)
    },
    checkText (thing) {
      let word = thing
      let wordInfo = ''
      if (word.length === 4) {
        if (word[3] === ' ') {
          wordInfo = getWord(word.substring(0, 3) + '-')
        } else {
          wordInfo = getWord(word)
        }
        if (wordInfo.exist === true) {
          this.tempDone = true
          this.thisWord = wordInfo.value
          this.updateWord(
            { number: this.number,
              whichWord: wordInfo.value })
        }
      } else {
        this.tempDone = false
        this.updateWord(
          { number: this.number,
            whichWord: '' })
      }
    }
  }
}
</script>

<style scoped>
</style>
