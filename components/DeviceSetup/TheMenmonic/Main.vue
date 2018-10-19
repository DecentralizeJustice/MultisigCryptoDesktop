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

                <wordBox v-on:updateWord='updateWord($event)' v-bind:number="item" v-for="item in front" :key="item" v-if='showFront'>
                </wordBox>

                <wordBox v-on:updateWord='updateWord($event)' v-bind:number="item" v-for="item in back" :key="item" v-if='!showFront'>
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
          <v-btn round :large='true' color='success' v-on:click=""><h3>Submit</h3></v-btn>
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
      words: {}
    }
  },
  computed: {
    front: function () {
      return ['1', '2', '3', '4', '5', '6']
    },
    back: function () {
      return ['7', '8', '9', '10', '11', '12']
    }
  },
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    },
    updateWord (option) {
      this.words[option.number] = option.whichWord
      console.log(this.words)
    },
    flipCard (front) {
      if (front === true) {
        this.showFront = true
      } else {
        this.showFront = false
      }
    }
  },
  created () {
    for (let i = 1; i < 13; i++) {
      this.words[i] = ''
    }
  }

}
</script>

<style scoped>

</style>
