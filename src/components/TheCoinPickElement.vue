<template>
  <div v-if="show">
    <p class="h2" style="padding-top: 2%;"> Pick Your Crypto:<p>
    <div  class="row text-center justify-content-center mt-5">
      <!--Btc-->
      <div id="Ethereum" class="col-3 mx-auto d-block">
          <img src="../assets/eth.svg" alt="Ethereum" style="width: 60%;">
      </div>
      <!--Btc-->
      <div id="Bitcoin" class="col-3 coinPick  mx-auto d-block" >
          <img src="../assets/bitcoin.svg" alt="Bitcoin" style="width: 100%;">
      </div>
      <!--Ltc-->
      <div id="Litecoin" class="col-3 mx-auto d-block" >
          <img src="../assets/litecoin.svg" alt="Litecoin" style="width: 100%;">
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'TheCoinPickElement',
  computed: {
    show () {
      return this.$store.state.showOpeningCoinPick
    }
  }
}
</script>

<style scoped>

</style>
