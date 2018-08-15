<template>
  <transition name="fade">
    <v-container text-xs-center xs12  flex fill-height  >
        <v-content row xs12 justify-center fill-height>
          <p class="h1 white--text m-5"> Pick Your Crypto:</p>
          <v-layout v-for="coin in TheBeginnerCoins" :key="coin.name" xs12 md4 text-xs-center justify-center align-content-center align-center>
            <v-flex color=transparent flat text-xs-center justify-center md4>
              <img :src="'/static/'+coin.url" :width="coin.width" v-on:click="pickCoin(coin.name)"/>
              <p class="h2 white--text m-3">{{coin.name}}</p>
            </v-flex>
          </v-layout>
        </v-content>
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
        // {name: 'Monero', url: 'monero.png', width: '75%'},
        {name: 'Bitcoin', url: 'bitcoin.svg', width: '75%'}
        // {name: 'Ethereum', url: 'eth.svg', width: '44%'}
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
  transition: opacity 1.0s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
