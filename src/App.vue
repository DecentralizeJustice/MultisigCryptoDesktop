<template>
  <div id="app" class="col-12">
    <TheWallet/>

  </div>
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
  body, html
      height: 100vh;
      /* The image used */
      background-image: url("../src/assets/background.jpg");

      /* Full height */
      height: 100vh;

      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
}
</style>
