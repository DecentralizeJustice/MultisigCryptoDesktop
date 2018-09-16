<template>
  <v-container justify-center fill-height fluid>

    <TheSetupDeviceIntro v-on:pickOption='choose($event,0)'
    v-if="shouldThisShow ([])">
    </TheSetupDeviceIntro>

    <TheCodeorSetup v-on:pickOption='choose($event,1)'
    v-if="shouldThisShow (['Setup'])">
    </TheCodeorSetup>

    <TheMultisigDevicesPlan v-on:pickOption='choose($event,2)'
    v-if="shouldThisShow (['Setup','1stStepSetup'])">
    </TheMultisigDevicesPlan>

    <TheLastStep v-on:pickOption='choose($event,2)'
    v-if="shouldThisShow (['Setup','h'])">
    </TheLastStep>

  </v-container>
</template>

<script>
import TheSetupDeviceIntro from '~/components/TheSetupElement/TheDeviceorTools.vue'
import TheCodeorSetup from '~/components/TheSetupElement/TheCodeorSetup.vue'
import TheMultisigDevicesPlan from '~/components/TheSetupElement/TheMultisigDevicesPlan.vue'
import TheLastStep from '~/components/TheSetupElement/TheLastStep.vue'
export default {
  name: 'TheSetupView',
  components: {
      TheSetupDeviceIntro,
      TheCodeorSetup,
      TheMultisigDevicesPlan,
      TheLastStep
    },
    methods: {
      choose (choice, index) {
        this.choiceArray.splice(index, 1, choice)
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
