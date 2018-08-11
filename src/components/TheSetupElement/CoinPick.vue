<template>
  <transition name="fade">
    <v-container  grid-list-md text-xs-center xs12  flex fill-height  >
      <v-card  class="card" flat xs12 >
        <v-layout row wrap>
          <v-flex xs12>
              <p class="h1 white--text m-2"> Pick Your Crypto:</p>
          </v-flex>
          <v-flex v-for="coin in TheBeginnerCoins" :key="coin.name" xs12 md4>
            <v-card color=transparent flat >
              <img :src="'/static/'+coin.url" :width="coin.width" v-on:click="pickCoin(coin.name)"/>
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
    pickCoin (coinName) {
      this.$emit('pickCoin', coinName)
    }
  },
  computed: {
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
