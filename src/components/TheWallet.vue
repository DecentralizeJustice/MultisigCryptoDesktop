<template>
  <v-content>
      <v-flex align-center fill-height xs12 >
        <TheCoinPickElement v-if="show" xs12/>
      </v-flex>

      <v-flex xs2>
       <TheSideBarElement v-if="!show" />
     </v-flex>
 </v-content>
</template>

<script>
import TheCoinPickElement from './TheCoinPickElement.vue'
import TheSideBarElement from './TheSideBarElement.vue'
export default {
  name: 'TheWallet',
  components: {
    TheCoinPickElement,
    TheSideBarElement
  },
  computed: {
    show () {
      return this.$store.state.showOpeningCoinPick
    }
  }

}
</script>

<style scoped>

</style>
