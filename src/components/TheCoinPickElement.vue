<template>
  <transition name="fade">
    <v-container grid-list-md text-xs-center xs12  flex fill-height v-if="shouldShow" >
      <v-card  id="main" flat>
        <v-layout row wrap>
          <v-flex xs12>
              <p class="h1 white--text m-2"> Pick Your Crypto:</p>
          </v-flex>
          <v-flex v-for="coin in TheBeginnerCoins" :key="coin.name" xs12 md4>
            <v-card color=transparent flat >
              <img :src="'/static/'+coin.url" :width="coin.width" v-on:click="hide(coin.name)"/>
              <p class="h2 white--text m-3">{{coin.name}}</p>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </transition>
</template>

<script>
export default {
  name: 'TheCoinPickElement',
  methods: {
    async hide (coinName) {
      let payload = {'nest1': 'firstTimeSetup', 'nest2': 'showOpeningCoinPick', 'status': false}
      let payload2 = {'nest1': 'firstTimeSetup', 'nest2': 'openingCoinPicked', 'status': coinName}
      await this.$store.dispatch('update2prop', payload2)
      this.$store.dispatch('update2prop', payload)
    }
  },
  computed: {
    shouldShow () {
      return this.$store.state.firstTimeSetup.showOpeningCoinPick
    }
  },
  data () {
    return {
      TheBeginnerCoins: [
        {name: 'Monero', url: 'monero.png', width: '72%'},
        {name: 'Bitcoin', url: 'bitcoin.svg', width: '72%'},
        {name: 'Ethereum', url: 'eth.svg', width: '44%'}
      ]
    }
  }
}
</script>

<style scoped>
#main{
   background-color: rgba(22, 48, 91, 0.7);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
