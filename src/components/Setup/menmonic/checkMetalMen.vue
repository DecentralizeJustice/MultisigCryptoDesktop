<template>
<div>
  <v-flex sm12 >

        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline text-xs-center" >Metal Card Setup</h3>
          </div>
        </v-card-title>
      <v-divider light/>

    <v-card-text class="headline font-weight-bold text-xs-center elevation-0">
      Please Enter Word Number {{passedTests+1}}
      <v-flex xs6 offset-xs3>
        <v-text-field v-model="currentWord">
        <template slot="label">
          Word {{passedTests+1}}
        </template>
        ></v-text-field>
      </v-flex>
    </v-card-text>

    <v-flex xs12 mb-3>
      <v-layout align-center justify-space-around row>
        <v-btn round :large='true' color='success' v-on:click="checkWord"
        ><h3>Submit</h3></v-btn>
      </v-layout>
    </v-flex>
  </v-flex>
</div>
</template>

<script>
// import wordBox from '@/components/Setup/menmonic/wordBox.vue'
export default {
  name: 'checkMetalMen',
  props: ['wordList'],
  components: {
  },
  data () {
    return {
      finishTest: false,
      passedTests: 0,
      totalFails: 0,
      numberArray: [],
      currentWord: ''
    }
  },
  computed: {

  },
  watch: {
    passedTests: function () {
      if (this.passedTests === this.numberArray.length) {
        this.passedAllTest()
      }
    },
    totalFails: function () {
      if (this.totalFails === 2) {
        this.failed()
      }
    }
  },
  methods: {
    checkWord () {
      let wordToTest = this.wordList[this.numberArray[this.passedTests]]
      if (this.currentWord === wordToTest) {
        this.passedTests += 1
        this.currentWord = ''
      } else {
        this.totalFails += 1
      }
    },
    passedAllTest () {
      this.$emit('passedTests', { passedMetalCheck: true })
    },
    failed () {
      this.$emit('failed')
    }
  },
  mounted: function () {
    const min = 1
    const max = 12
    for (let i = 0; i !== 3; i++) {
      let random = Math.floor(Math.random() * (+max - +min)) + +min
      this.numberArray.push(random)
    }
  }
}
</script>

<style scoped>
</style>
