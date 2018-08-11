<template>
  <v-content align-center xs12 >
    <TheSetupElement  v-if="show"></TheSetupElement>
    <TheSideBarElement v-if="!show"></TheSideBarElement>
 </v-content>
</template>

<script>
import TheSetupElement from './TheSetupElement/TheSetupElement.vue'
import TheSideBarElement from './TheSideBar/TheSideBarElement.vue'
export default {
  name: 'TheWallet',
  components: {
    TheSetupElement,
    TheSideBarElement
  },
  computed: {
    show () {
      return this.$store.state.firstTimeSetup.showOpeningSetup
    }
  }

}
</script>

<style scoped>

</style>
