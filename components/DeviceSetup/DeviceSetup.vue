<template>
  <v-container justify-center fill-height fluid>

    <PickDevice v-on:pickOption='choose($event,0)'
    v-if="true">
    </PickDevice>


  </v-container>
</template>

<script>
import PickDevice from '~/components/DeviceSetup/PickDevice.vue'

export default {
  name: 'DeviceSetup',
  components: {
    PickDevice
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
