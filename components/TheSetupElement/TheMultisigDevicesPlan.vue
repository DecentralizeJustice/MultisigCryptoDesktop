<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 sm10 offset-sm1>
            <TheHardwareNumber v-on:pickOption='choose($event)'
            v-if="shouldThisShow (0)"></TheHardwareNumber>
            <HardwareWalletSetup v-on:pickOption='choose($event)'
            v-if="shouldThisShow (1)"></HardwareWalletSetup>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
import TheHardwareNumber from '~/components/TheSetupElement/DeviceInfo/TheHardwareNumber.vue'
import HardwareWalletSetup from '~/components/TheSetupElement/DeviceInfo/HardwareWalletSetup.vue'


export default {
  name: 'TheMultisigDevicesPlan',
  components: {
    TheHardwareNumber,
    HardwareWalletSetup
    },
  methods: {
    pickOption (option) {
      this.$emit('pickOption', option)
    },
    shouldThisShow (index) {
      if (index !== this.choiceArray.length) { return false }
      return true
    },
    choose(option){
      this.choiceArray.push(option)
      this.finalChoice(this.choiceArray)
    },
    finalChoice(choiceArray){
      if(choiceArray.length>1){
      this.pickOption(choiceArray)
      }
    }
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
