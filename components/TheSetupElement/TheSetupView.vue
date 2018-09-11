<template>
  <v-container justify-center fill-height fluid>
  <TheSetupDeviceIntro v-on:pickOption='choose($event,0)'
  v-if="shouldThisShow ([])">
  </TheSetupDeviceIntro>
  <TheDeviceNumberandType v-on:pickOption='choose($event,1)'
  v-if="shouldThisShow (['Setup'])">
  </TheDeviceNumberandType>
  </v-container>
</template>

<script>
import TheSetupDeviceIntro from '~/components/TheSetupElement/TheDeviceorTools.vue'
import TheDeviceNumberandType from '~/components/TheSetupElement/TheDeviceNumberandType.vue'
export default {
  name: 'TheSetupView',
  components: {
      TheSetupDeviceIntro,
      TheDeviceNumberandType
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
