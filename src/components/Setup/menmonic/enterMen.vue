<template>
  <div>
        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline text-xs-center" >Metal Card Setup</h3>
          </div>
        </v-card-title>
        <v-divider light/>

      <v-form xs12>
        <v-container xs12 >
          <v-layout  xs12 row wrap >
            <!-- eslint-disable-next-line -->
            <wordBox v-if='whichSide(key)' v-on:updateWord='updateWord($event)'
            v-bind:number="key" v-bind:done='isDone(key)'
            v-for="(value,key) in words" :key="key"  v-bind:word='value'>
            </wordBox>

          </v-layout>
        </v-container>
      </v-form>

      <v-flex xs12 ma-2>
        <v-layout align-center justify-space-around row>
          <v-btn-toggle v-model="toggle_exclusive" mandatory>
            <v-btn round :large='true' flat v-on:click="flipCard(true)"><h2>1-6</h2></v-btn>
            <v-btn round :large='true' flat v-on:click="flipCard(false)"><h2>7-12</h2></v-btn>
           </v-btn-toggle>
        </v-layout>
      </v-flex>

      <div class="text-xs-center">
        <v-btn round :large='true' color='success' v-on:click="submitList"
        v-if='completeWordlist' ><h3>Submit</h3></v-btn>
      </div>

  </div>
</template>

<script>
import wordBox from '@/components/Setup/menmonic/wordBox.vue'
export default {
  name: 'Entermem',
  components: {
    wordBox
  },
  data () {
    return {
      showFront: true,
      toggle_exclusive: 0,
      completeWordlist: false
    }
  },
  computed: {
    words: {
      get: function () {
        let words = {}
        for (let i = 1; i < 13; i++) {
          words[i] = 'test'
        }
        return words
      },
      set: function (newValue) {
        this.words[newValue.number] = newValue.whichWord
        this.checkforComplete()
      }
    }
  },
  watch: {
  },
  methods: {
    whichSide (index) {
      if (index < 7 && this.showFront === true) {
        return true
      } else if (index >= 7 && this.showFront === false) {
        return true
      }
    },
    submitwordList (option) {
      this.$emit('submitwordList', option)
    },
    back () {
      this.$emit('back')
    },
    updateWord (option) {
      this.words = option
    },
    isDone (index) {
      if (this.words[index] === '') {
        return false
      } else {
        return true
      }
    },
    flipCard (front) {
      if (front === true) {
        this.showFront = true
      } else {
        this.showFront = false
      }
    },
    checkforComplete () {
      for (let i = 1; i < 13; i++) {
        if (this.words[i] === '') {
          this.completeWordlist = false
          return
        }
      }
      this.completeWordlist = true
    },
    submitList () {
      this.submitwordList(this.words)
    }
  }
}
</script>

<style scoped>
</style>
