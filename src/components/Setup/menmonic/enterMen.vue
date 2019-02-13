<template>

        <v-card>
          <v-layout  xs12 row wrap justify-space-around >
          <v-img
           src='https://cdn-images-1.medium.com/max/1600/1*51Kjfq6fe0mFTd8P8_Bz_A.jpeg'
           aspect-ratio="5"
         ></v-img>

          <v-form xs12>

            <v-container xs12 >
              <v-layout  xs12 row wrap >

                <wordBox v-on:updateWord='updateWord($event)' v-bind:number="key" v-bind:done='isDone(key)'
                  v-for="(value,key) in words" :key="key" v-if='whichSide(key)' v-bind:word='value'>
                </wordBox>

              </v-layout>
            </v-container>
          </v-form>
          <v-flex xs6 ma-2>
            <v-layout align-center justify-space-around row>
              <v-btn-toggle v-model="toggle_exclusive" mandatory>
                <v-btn round :large='true' flat v-on:click="flipCard(true)"><h2>1-6</h2></v-btn>
                <v-btn round :large='true' flat v-on:click="flipCard(false)"><h2>7-12</h2></v-btn>
               </v-btn-toggle>
            </v-layout>
          </v-flex>
          <v-flex xs12 ma-2>
            <v-layout align-center justify-space-around row>
              <v-btn round :large='true' color='success' v-on:click="submitList"
              v-if='completeWordlist'><h3>Submit</h3></v-btn>
            </v-layout>
        </v-flex>
          </v-layout>
          <v-flex  text-xs-center xs1 align-center pb-2>
          <v-layout justify-space-around>
          <v-icon large color='secondary' @click.native="back()">arrow_back</v-icon>
          <v-icon large color='secondary'>help</v-icon>
          </v-layout>
          </v-flex>
            </v-card>

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
      completeWordlist: true
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
