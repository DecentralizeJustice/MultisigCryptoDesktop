<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 sm10 offset-sm1>
          <v-card>
            <v-img
              src="/deviceoptions.jpg"
              aspect-ratio="3"
            ></v-img>
            <TheDeviceNumber v-on:pickOption='choose($event)'
            v-if="shouldThisShow (0)"></TheDeviceNumber>
            <TheDeviceType v-on:pickOption='choose($event)'
            v-if="shouldThisShow (1)"></TheDeviceType>
          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
import TheDeviceNumber from '~/components/TheSetupElement/DeviceInfo/TheDeviceType.vue'
import TheDeviceType   from '~/components/TheSetupElement/DeviceInfo/TheDeviceNumber.vue'
export default {
  name: 'TheDeviceNumberandType',
  components: {
    TheDeviceNumber,
    TheDeviceType
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
      this.finalChoice(option)
    },
    finalChoice(option){
      if(option === '1' || option === '2'){
      this.pickOption(this.choiceArray)
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
