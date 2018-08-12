<template>
  <v-container justify-center fill-height fluid>
    <TheCoinPickElement  v-on:pickCoin='pickCoin($event,0)'
    v-if="shouldShow (0)">
    </TheCoinPickElement>

    <TheMethodPicker v-on:pickMethod='pickGoal($event,1)'
    v-if="shouldShow (1)">
    </TheMethodPicker>
  </v-container>
</template>

<script>
import TheCoinPickElement from './CoinPick.vue'
import TheMethodPicker from './TheMethodPicker.vue'
export default {
  name: 'TheSetupElement',
  components: {
    TheCoinPickElement,
    TheMethodPicker
  },
  methods: {
    pickCoin (coinName, index) {
      this.choices.coin = coinName
      this.nextStep(index)
    },
    pickGoal (method, index) {
      this.choices.goal = method
      this.nextStep(index)
    },
    shouldShow (index) {
      if (this.choiceArray[index] === 1) { return true }
    },
    nextStep (index) {
      this.choiceArray.splice(index, 1, 0)
      this.choiceArray.splice(index + 1, 1, 1)
    }
  },
  computed: {
  },
  data () {
    return {
      choices: {
        coin: false,
        goal: false
      },
      choiceArray: [1, 0, 0, 0, 0, 0]
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
