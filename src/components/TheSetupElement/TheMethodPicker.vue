<template>
  <transition name="fade">
    <v-container  grid-list-md text-xs-center xs12  flex  >
        <v-layout row wrap card>
          <v-flex v-for="coin in TheBeginnerCoins" :key="coin.name" xs12 md4>
            <v-card color=transparent flat >
              <img :src="'/static/'+coin.url" :width="coin.width" v-on:click="pickCoin(coin.name)"/>
              <p class="h2 white--text m-3">{{coin.name}}</p>
            </v-card>
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
        {name: 'Bitcoin', url: 'password.svg', width: '75%'},
        {name: 'Ethereum', url: 'genkey.svg', width: '75%'},
        {name: 'Monero', url: 'contract.png', width: '72%'}
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
