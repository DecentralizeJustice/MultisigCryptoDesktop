<template>
  <v-container grid-list-md text-xs-center xs12 flex fill-height v-if="(show)">
    <v-card color=transparent flat>
      <v-layout row wrap>
        <v-flex xs12>
            <p class="h2"> Pick Your Crypto:</p>
        </v-flex>
        <v-flex v-for="coin in TheBeginnerCoins" :key="coin.name" xs4>
          <v-card color=transparent flat>
            <img :src="'/static/'+coin.url" :width="coin.width"/>
            <p class="h2">{{coin.name}}</p>
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
    hide: function () {
      this.$store.dispatch('hide')
    }
  },
  computed: {
    show () {
      return this.$store.state.showOpeningCoinPick
    }
  },
  data () {
    return {
      TheBeginnerCoins: [
        {name: 'Litecoin', url: 'litecoin.svg', width: '54%'},
        {name: 'Bitcoin', url: 'bitcoin.svg', width: '54%'},
        {name: 'Ethereum', url: 'eth.svg', width: '34%'}
      ]
    }
  }
}
</script>

<style scoped>

.h2{
    color:white;
}
</style>
