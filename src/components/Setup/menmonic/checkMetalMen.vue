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
      Please Enter Word Number {{wordIndexToTest}}
      <v-flex xs6 offset-xs3>
        <v-text-field v-model="currentWord">
        <template slot="label">
          Word {{wordIndexToTest}}
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
      <v-dialog
          v-model="failedTest"
          width="600"
          persistent
            >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Metal Card Mistake
        </v-card-title>
        <v-card-text>
          There was a mistake in the way that you entered your words,
          please go back and enter them again.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="failed"
          >
            Try Again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      currentWord: '',
      failedTest: false
    }
  },
  computed: {
    wordIndexToTest: function () {
      return this.numberArray[this.passedTests]
    }
  },
  watch: {
    passedTests: function () {
      if (this.passedTests === this.numberArray.length) {
        this.passedAllTest()
      }
    },
    totalFails: function () {
      if (this.totalFails === 2) {
        this.failedTest = true
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
