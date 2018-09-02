<template>
  <transition name="fade">
    <v-container  grid-list-md text-xs-center xs12  flex  >
        <v-layout row >
          <v-flex v-for="method in Methods" :key="method.name" xs12 md3 class="box" style="margin: auto;">
            <v-card color=transparent flat class="pa-2">
              <img :src="'/static/'+method.url" :width="method.width" v-on:click="pickMethod(method.name)"/>
              <p class="h2 white--text m-3">{{method.name}}</p>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
  </transition>
</template>

<script>
export default {
  name: 'TheMethodPicker',
  methods: {
    pickMethod (methodName) {
      this.$emit('pickMethod', methodName)
    }
  },
  computed: {
  },
  data () {
    return {
      Methods: [
        {name: 'Get PaperWallet', url: 'genkey.svg', width: '60%'},
        {name: 'Use Web Wallet', url: 'password.svg', width: '60%'},
        {name: 'Send Crypto', url: 'send-money.svg', width: '60%'}
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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
