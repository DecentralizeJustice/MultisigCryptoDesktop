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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
