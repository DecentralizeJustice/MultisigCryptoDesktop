<template>
  <transition name="fade">
    <v-container  grid-list-md text-xs-center xs12  flex  >
        <v-layout row >
          <v-flex v-for="method in Methods" :key="method.name" xs12 md4>
            <v-card color=transparent flat >
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
        {name: 'Setup Wallet', url: 'password.svg', width: '60%'},
        {name: 'Sign Transaction', url: 'contract.png', width: '60%'}
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
