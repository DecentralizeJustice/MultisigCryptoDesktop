<template>
  <v-container  grid-list-md text-xs-center xs12  flex fluid fill-height  >

      <v-layout row wrap fill-height flex fluid justify-center>
        <v-flex v-for="method in Themethods" :key="method.name" xs12 md6 fill-height flex text-xs-center column>
          <v-card color=transparent flat xs12 fill-height flex >
            <img :src="'/static/'+method.url" :width="method.width" v-on:click="pickMethod(method.name)"/>
            <p class="h2 white--text m-3">{{method.title}}</p>
          </v-card>
        </v-flex>
      </v-layout>

  </v-container>

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
        {name: 'genkey', title: 'Make Keys', url: 'genkey.svg', width: '35%'},
        {name: 'signTrans', title: 'Sign Transaction', url: 'password.svg', width: '35%'}
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
