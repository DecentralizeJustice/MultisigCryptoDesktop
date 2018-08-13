<template>
  <transition name="fade">
    <v-container text-xs-center xs10  flex row  justify-space-around align-center>
          <v-layout d-flex v-for="method in Themethods" :key="method.name" xs12 md2 column align-center>
            <v-card class="card" align-center>
              <v-layout flex align-center justify-center row>
                <img :src="'/static/'+method.url" :width="method.width" v-on:click="pickMethod(method.name)" />
                <p class="h2 white--text m-3">{{method.title}}</p>
              </v-layout>
            </v-card>
        </v-layout>
    </v-container>
  </transition>
</template>

<script>
export default {
  name: 'TheMethodPicker',
  methods: {
    pickMethod (method) {
      this.$emit('pickMethod', method)
    }
  },
  computed: {
  },
  data () {
    return {
      Themethods: [
        {name: 'setupwallet', title: 'Setup Wallet', url: 'genkey.svg', width: '75%'},
        {name: 'signTrans', title: 'Sign Transaction', url: 'password.svg', width: '75%'}
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
