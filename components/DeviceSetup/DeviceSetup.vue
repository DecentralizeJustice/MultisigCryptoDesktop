<template>
  <v-container justify-center fill-height>
    
    <PickDevice  v-on:pickOption='choose($event,0)'
    v-if="shouldThisShow ([])">
    </PickDevice>
    <TheMenmonic  v-on:pickOption='choose($event,0)'
    v-if="shouldThisShow ([''])">
    </TheMenmonic>



  </v-container>
</template>

<script>
import PickDevice from '~/components/DeviceSetup/PickDevice.vue'
import TheMenmonic from '~/components/DeviceSetup/TheMenmonic/Main.vue'

export default {
  name: 'DeviceSetup',
  components: {
    PickDevice,
    TheMenmonic
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
