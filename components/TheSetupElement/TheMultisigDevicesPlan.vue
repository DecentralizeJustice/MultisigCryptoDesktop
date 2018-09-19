<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 sm10 offset-sm1>

        <TheHardwareNumber v-on:pickOption='choose($event)'
        v-if="shouldThisShow (0)"></TheHardwareNumber>

        <TheComputerNumber v-bind:choiceArray=choiceArray v-on:pickOption='choose($event)'
        v-if="shouldThisShow (1)"></TheComputerNumber>

        <ThePhoneNumber v-bind:choiceArray=choiceArray v-on:pickOption='choose($event)'
        v-if="shouldThisShow (2)"></ThePhoneNumber>

        <FinalPlan v-bind:choiceArray=choiceArray v-on:pickOption='choose($event)'
        v-if="shouldThisShow (3)"></FinalPlan>

        </v-flex>
      </v-layout>
   </v-container>

</v-content>
</template>

<script>
import ThePhoneNumber from '~/components/TheSetupElement/DeviceInfo/ThePhoneNumber.vue'
import TheHardwareNumber from '~/components/TheSetupElement/DeviceInfo/TheHardwareNumber.vue'
import TheComputerNumber from '~/components/TheSetupElement/DeviceInfo/TheComputerNumber.vue'
import FinalPlan from '~/components/TheSetupElement/DeviceInfo/FinalPlan.vue'

export default {
  name: 'TheMultisigDevicesPlan',
  computed: {
   showMenmonicIndex: function() {
     if (this.hardwarenumbers.length===0){return -1}
     else {
       return this.hardwarenumbers.length+2}
   }
 },
  components: {
    TheHardwareNumber,
    ThePhoneNumber,
    TheComputerNumber,
    FinalPlan
    },
  methods: {
    pickOption (option) {
      this.$emit('pickOption', option)
    },
    shouldThisShow (index) {
      if (index === this.choiceArray.length) { return true }
      return false
    },
    finalplanindex(){
      if(this.shouldPhoneShow()===-1){return 2}
      else{return 3}
    },
    choose(option){
      this.choiceArray.push(option)

      // this.finalChoice(this.choiceArray)
    },
  },
  data () {
    return {
      choiceArray: [],

    }
  }

}
</script>

<style scoped>

</style>
