<template>
    <v-app  dark>
      <TheSetupView v-if ="this.$store.state.setupInfo.showDevicePlan"></TheSetupView>
    </v-app>
</template>

<script>
import TheSetupView from '~/components/TheSetupElement/TheSetupView.vue'
export default {
  components: {
      TheSetupView
    },
  }

</script>
