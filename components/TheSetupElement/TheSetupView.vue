<template>
  <v-container justify-center fill-height fluid>

    <TheSetupDeviceIntro v-on:pickOption='choose($event,0)'
    v-if="shouldThisShow ([])">
    </TheSetupDeviceIntro>

    <TheMultisigDevicesPlan v-on:pickOption='final($event)'
    v-on:back='back([])'
    v-if="shouldThisShow (['Setup'])">
    </TheMultisigDevicesPlan>


  </v-container>
</template>

<script>
import TheSetupDeviceIntro from '~/components/TheSetupElement/TheDeviceorTools.vue'
import TheMultisigDevicesPlan from '~/components/TheSetupElement/TheMultisigDevicesPlan.vue'
export default {
  name: 'TheSetupView',
  components: {
    TheSetupDeviceIntro,
    TheMultisigDevicesPlan
  },
  methods: {
    choose (choice, index) {
      this.choiceArray.splice(index, 1, choice)
    },
    back (index) {
      this.choiceArray = index
    },
    final (plan) {
      let view = this.$store.state.mainView
      this.$store.dispatch('updateDevicePlan', plan)
      this.$store.dispatch('updateMainView', view + 1)
      console.log(this.$store.state)
    },
    shouldThisShow (index) {
      if (index.length !== this.choiceArray.length) { return false }
      for (let i = 0; i < index.length; i++) {
        if (index[i] === '') { continue }
        if (index[i] !== this.choiceArray[i]) { return false }
      }
      return true
    }
  },
  computed: {
  },
  data () {
    return {
      choiceArray: []
    }
  }
}


</script>

<style scoped>

</style>
