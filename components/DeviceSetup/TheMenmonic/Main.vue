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
          <v-flex xs6>
            <v-layout align-center justify-space-around row>
              <v-btn-toggle v-model="toggle_exclusive" mandatory>
                <v-btn round :large='true' flat v-on:click="flipCard(true)"><h2>1-6</h2></v-btn>
                <v-btn round :large='true' flat v-on:click="flipCard(false)"><h2>7-12</h2></v-btn>
               </v-btn-toggle>
            </v-layout>
          </v-flex>
          <v-btn round :large='true' color='success' v-on:click="" v-if='completeWordlist'><h3>Submit</h3></v-btn>
          </v-layout>
        </v-card>

</template>

<script>
import wordBox from '~/components/DeviceSetup/TheMenmonic/wordBox.vue'
export default {
  name: 'TheMenmonic',
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
      // getter
      get: function () {
        let words = {}
        for (let i = 1; i < 13; i++) {
          words[i] = ''
        }
        return words
      },
      // setter
      set: function (newValue) {
        this.words[newValue.number] = newValue.whichWord
      }
    }
  },
  methods: {
    whichSide (index) {
      if (index < 7 && this.showFront === true) {
        return true
      } else if (index > 7 && this.showFront === false) {
        return true
      }
    },
    choose (option) {
      this.$emit('pickOption', option)
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
    }
  }

}
</script>

<style scoped>

</style>
