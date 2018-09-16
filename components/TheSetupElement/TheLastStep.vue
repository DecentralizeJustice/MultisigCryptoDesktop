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

          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>

export default {
  name: 'TheLastStep',
  components: {

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
