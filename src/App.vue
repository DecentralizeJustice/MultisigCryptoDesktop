<template>
  <v-app id="app" >
     <TheWallet/>
  </v-app>
</template>

<script>
import TheWallet from './components/TheWallet.vue'

export default {
  name: 'app',
  components: {
    TheWallet
  }
}
</script>

<style>
#app {
      height: 100vh;
      /* The image used */
      background-image: url("../public/static/background.jpg");
      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
}

</style>
