<template>
  <v-container justify-center fill-height fluid>
    <TheCoinPickElement  v-on:pickCoin='choose($event,0)'
    v-if="shouldShow (0)">
    </TheCoinPickElement>
    <TheMethodPicker v-on:pickMethod='choose($event,1)'
    v-if="shouldShow (1)">
    </TheMethodPicker>
  </v-container>
</template>

<script>
import TheCoinPickElement from './CoinPick.vue'
import TheMethodPicker from './TheMethodPicker.vue'
// const Gen = require('./../../javascript/generateMenmonic.js')
export default {
  name: 'TheSetupElement',
  components: {
    TheCoinPickElement,
    TheMethodPicker
  },
  methods: {
    choose (choice, index) {
      this.choiceArray.splice(index, 1, 0)
      this.choiceArray.splice(index + 1, 1, 'show')
    },
    shouldShow (index) {
      if (this.choiceArray[index] === 'show') { return true }
    }
  },
  computed: {
  },
  data () {
    return {
      choiceArray: ['show', 0, 0, 0, 0]
    }
  }
}
</script>

<style scoped>
.card{
   background-color: rgba(22, 48, 91, 0.7);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
