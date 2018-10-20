<template>

  <v-flex xs12 sm6 md3>
    <v-text-field
      :label='number'
      :outline='true' v-model="thisWord" v-on:keyup="checkText (thisWord)"
    >
    <v-fade-transition slot="append">
      <v-icon v-if="checkDone">check_circle</v-icon>
      <v-icon v-else>error</v-icon>
    </v-fade-transition>

    </v-text-field>
  </v-flex>

</template>

<script>
import { getWord } from '~/assets/WordList/getWord.js'
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
    checkDone: function () {
      if ((this.done || this.tempDone) === true) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    updateWord (option) {
      this.$emit('updateWord', option)
    },
    checkText (thing) {
      let word = thing
      if (word.length === 4) {
        if (word[3] === '') {
          word = word.splice(0, 3)
          word += '-'
        }
        let wordInfo = getWord(word)
        if (wordInfo.exist === true) {
          this.tempDone = true
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
