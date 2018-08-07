<template>
  <transition name="fade">
    <v-container grid-list-md text-xs-center xs2 flex left id="main">
      <v-card   flat>
      </v-card>
   </v-container>
 </transition>
</template>

<script>
export default {
  name: 'TheSideBarElement',
  computed: {
    shouldShow () {
      return this.$store.state.firstTimeSetup.showOpeningCoinPick
    }
  }
}
</script>

<style scoped>
#main{
   background-color: rgba(22, 48, 91, 0.7);
   height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>
