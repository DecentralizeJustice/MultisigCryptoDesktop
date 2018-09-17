<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 sm10 offset-sm1>

            <TheHardwareNumber v-on:pickOption='choose($event)'
            v-if="shouldThisShow (0)"></TheHardwareNumber>

            <div v-for="nums in numbers"  v-bind:key="nums">
              <HardwareWalletSetup v-bind:number=nums v-on:pickOption='choose($event)'
              v-if="shouldThisShow (nums)"></HardwareWalletSetup>
            </div>

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
      if(option.slice(0,9)==='Hardware:'){this.setnumArray(option)}
      this.finalChoice(this.choiceArray)
    },
    finalChoice(choiceArray){
      if(choiceArray.length>3){
      this.pickOption(choiceArray)
      }
    },
    setnumArray(numofwallets){
      let num=numofwallets[9]
      for (let i = 0; i < num; i++) {
          this.numbers.splice(i, 1, i+1)
      }
    }
  },
  data () {
    return {
      choiceArray: [],
      numbers: []
    }
  }

}
</script>

<style scoped>

</style>
