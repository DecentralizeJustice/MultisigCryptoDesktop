<template>
  <v-content align-center xs12>
    <TheSetupElement  v-if="show"/>
    <TheSideBarElement v-if="!show"/>
 </v-content>
</template>

<script>
import TheSetupElement from './TheSetupElement.vue'
import TheSideBarElement from './TheSideBarElement.vue'
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
