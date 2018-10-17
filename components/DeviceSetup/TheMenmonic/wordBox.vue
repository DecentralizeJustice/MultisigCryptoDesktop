<template>

  <v-flex xs12 sm6 md3>
    <v-text-field
      :label='getRightPhrase(number)'
      :outline='true' v-model="word" v-on:keyup="checkText (word)"
    >
    <v-fade-transition slot="append">
      <v-icon v-if="done">check_circle</v-icon>
      <v-icon v-else>error</v-icon>
    </v-fade-transition>

    </v-text-field>
  </v-flex>

</template>

<script>
import { getWord } from '~/assets/getWord.js'
export default {
  data () {
    return {
      word: '',
      done: false
    }
  },
  name: 'wordBox',
  props: ['number'],
  computed: {
  },
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    },
    checkText (word) {
      if (word.length === 4) {
        if (word[3] === '') {
          word = word.splice(0, 3)
          word += '-'
        }
        let wordInfo = getWord(word)
        if (wordInfo.exist === true) {
          this.word = wordInfo.value
          this.done = true
        }
      } else {
        this.done = false
      }
    },
    getRightPhrase (i) {
      let j = i % 10
      let k = i % 100
      if (j === 1 && k !== 11) {
        return i + 'st'
      }
      if (j === 2 && k !== 12) {
        return i + 'nd'
      }
      if (j === 3 && k !== 13) {
        return i + 'rd'
      }
      return i + 'th'
    }
  }

}
</script>

<style scoped>

</style>
