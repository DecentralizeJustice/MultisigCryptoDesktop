<template>
  <transition name="fade">
    <v-container  fluid  >
        <v-layout wrap align-center justify-center>
          <v-flex md6 xs11 align-center justify-center box>
          <p class="h1 white--text text-xs-center ma-3" > Pick Your Crypto:</p>
          <v-flex v-for="coin in TheBeginnerCoins" :key="coin.name" xs12 md9 style="margin: auto;">
            <v-card color=transparent width=auto flat class="text-md-center">
              <v-layout align-center justify-center column fill-height >
              <img :src="'/static/'+coin.url" :width="coin.width" v-on:click="pickCoin(coin.name)"/>
              <p class="h1 white--text m-3">{{coin.name}}</p>
              </v-layout>
            </v-card>
          </v-flex>
        </v-flex>
        </v-layout>
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
.box{
   background-color: rgba(22, 48, 91, 0.9);
   border-radius:8%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
