<template>
  <v-container  fill-height fluid>
    <!-- <TheCoinPickElement  v-on:pickCoin='pickCoin($event)'
    v-if="false">
    </TheCoinPickElement> -->

    <TheMethodPicker v-on:pickMethod='pickGoal($event)'
    v-if="true">
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
    pickCoin (coinName) {
      this.choices.chosingCoin = coinName
      this.choices.chosingGoal = true
    },
    pickGoal (method) {
      this.choices.choosingGoal = method
    }
  },
  computed: {
  },
  data () {
    return {
      choices: {
        chosingCoin: false,
        choosingGoal: false
      }
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
