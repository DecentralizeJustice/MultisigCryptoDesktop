<template>
  <transition name="fade">
    <v-container  fluid  >
        <v-layout row align-center justify-space-around fill-height style="width:75%;margin:auto;">
          <v-flex v-for="choice in PaperWalletChoices" :key="choice.name" xs12 md6 >
            <v-card width=auto class="ma-4 box pa-2">
              <v-layout align-center justify-center column fill-height >
              <img :src="'/static/'+choice.url" :width="choice.width" v-on:click="pickPaperWallettype(choice.name)"/>
              <p class="h2 white--text m-3" style="text-align: center;">{{choice.name}}</p>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
  </transition>
</template>
<script>
export default {
  name: 'ThePaperWalletMethod',
  methods: {
    pickPaperWallettype (choice) {
      this.$emit('pickPaperWallettype', choice)
    }
  },
  computed: {
  },
  data () {
    return {
      PaperWalletChoices: [
        {name: 'Expert PaperWallet', url: 'logo.svg', width: '60%'},
        {name: 'DIY Paperwallet', url: 'contract.svg', width: '60%'}
      ]
    }
  }
}
</script>

<style scoped>
.box{
   background-color: rgba(22, 48, 91, 0.9);
   border-radius:5%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.0s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
