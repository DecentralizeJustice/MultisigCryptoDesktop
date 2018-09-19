<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat>
            <v-img
              src="computer.jpg"
              aspect-ratio="3"
            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h3 class="headline pb-3" >Number of Computer Devices:</h3>
              </div>
            </v-card-title>
            <v-container grid-list-md text-xs-center xs12>
              <v-layout row wrap align-center justify-space-around>
                <v-flex v-for="num in correctNumberofButtons" v-bind:key="num" xs2>
                  <v-btn large flat round color='secondary' @click.native="choose(num)">
                    <h3 class="headline" >{{num}}</h3>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>

          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'TheComputerNumber',
  props: ['choiceArray'],
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    }
  },
  computed: {
    correctNumberofButtons: function () {

      if (this.choiceArray[0]===0){return [0,1,2,3]}
      else { return [1,2,3]}

    }
  }

}
</script>

<style scoped>

</style>
