<template>
  <v-container justify-center fill-height fluid>
    <TheCoinPickElement  v-on:pickCoin='choose($event,0)'
    v-if="shouldThisShow ([])">
    </TheCoinPickElement>
    <TheMethodPicker v-on:pickMethod='choose($event,1)'
    v-if="shouldThisShow ([''])">
    </TheMethodPicker>
    <ThePaperWalletMethod v-on:pickPaperWallettype='choose($event,4)'
    v-if="shouldThisShow (['','Get PaperWallet'])">
    </ThePaperWalletMethod>
  </v-container>
</template>

<script>
import TheCoinPickElement from './CoinPick.vue'
import TheMethodPicker from './TheMethodPicker.vue'
import ThePaperWalletMethod from './Paperwallet.vue'
// const Gen = require('./../../javascript/generateMenmonic.js')
export default {
  name: 'TheSetupElement',
  components: {
    TheCoinPickElement,
    TheMethodPicker,
    ThePaperWalletMethod
  },
  methods: {
    choose (choice, index) {
      this.choiceArray.splice(index, 1, choice)
    },
    shouldThisShow (index) {
      if (index.length !== this.choiceArray.length) { return false }

      for (let i = 0; i < index.length; i++) {
        if (index[i] === '') { continue }
        if (index[i] !== this.choiceArray[i]) { return false }
      }
      return true
    }
  },
  computed: {
  },
  data () {
    return {
      choiceArray: []
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
