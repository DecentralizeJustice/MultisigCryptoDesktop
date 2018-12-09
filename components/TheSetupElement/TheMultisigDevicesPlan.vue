<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 sm10 offset-sm1>

        <TheHardwareNumber v-on:pickOption='choose($event)'
        v-on:back='back(-1)'
        v-if="shouldThisShow (0)"></TheHardwareNumber>

        <FinalPlan v-bind:choiceArray='choiceArray' v-on:pickOption='pickOption($event)'
        v-on:back='back(0)'
        v-if="shouldThisShow (3)"></FinalPlan>

        </v-flex>
      </v-layout>
   </v-container>

</v-content>
</template>

<script>
import TheHardwareNumber from '~/components/TheSetupElement/DeviceInfo/TheHardwareNumber.vue'
import FinalPlan from '~/components/TheSetupElement/DeviceInfo/FinalPlan.vue'

export default {
  name: 'TheMultisigDevicesPlan',
  computed: {
  },
  components: {
    TheHardwareNumber,
    FinalPlan
  },
  methods: {
    pickOption (option) {
      let plan = {}
      plan['hardware'] = this.choiceArray[0]
      plan['lab'] = this.choiceArray[1]
      plan['phone'] = this.choiceArray[2]
      this.$emit('pickOption', plan)
    },
    shouldThisShow (index) {
      if (index === this.choiceArray.length) { return true }
      return false
    },
    choose (option) {
      this.choiceArray.push(option)
      this.choiceArray.push(1)
      this.choiceArray.push(1)
    },
    back (option) {
      if (option === -1) {
        this.$emit('back')
        return
      }
      let newArray = []
      for (let i = 0; i < option; i++) {
        newArray[i] = this.choiceArray[i]
      }
      this.choiceArray = newArray
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
