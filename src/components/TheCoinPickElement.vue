<template>
  <v-container grid-list-md text-xs-center xs11 flex fill-height v-if="shouldShow" >
    <v-card  id="main" flat>
      <v-layout row wrap>
        <v-flex xs12>
            <p class="h1 white--text m-2"> Pick Your Crypto:</p>
        </v-flex>
        <v-flex v-for="coin in TheBeginnerCoins" :key="coin.name" xs4>
          <v-card color=transparent flat >
            <img :src="'/static/'+coin.url" :width="coin.width" v-on:click="hide(false)"/>
            <p class="h2 white--text m-3">{{coin.name}}</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'TheCoinPickElement',
  methods: {
    hide: function (payload) {
      this.$store.dispatch('hide', payload)
    }
  },
  computed: {
    shouldShow () {
      return this.$store.state.showOpeningCoinPick
    }
  },
  data () {
    return {
      TheBeginnerCoins: [
        {name: 'Litecoin', url: 'litecoin.svg', width: '72%'},
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
</style>
