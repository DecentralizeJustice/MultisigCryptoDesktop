<template>
  <div v-if="!(show)" class="">
 </div>
</template>

<script>
export default {
  name: 'TheSideBarElement',
  computed: {
    show () {
      return this.$store.state.showOpeningCoinPick
    }
  }
}
</script>

<style scoped>

</style>
