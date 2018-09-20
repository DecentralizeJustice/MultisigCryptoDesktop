<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat>
            <v-img
              src="plan.jpg"
              aspect-ratio="5"

            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h1 >Confirm Final Plan</h1>
              </div>
            </v-card-title>
            <v-flex xs4>
              <v-card>
                <v-toolbar color="black" >
                  <v-layout row wrap align-center>
                    <v-flex class="text-xs-center">
                      <v-toolbar-title>Laptop 1</v-toolbar-title>
                    </v-flex>
                  </v-layout>
                </v-toolbar>

                <v-card-title>
                   <div>
                     <h3>Number of Hardware Wallets:</h3>
                   </div>
                 </v-card-title>
                </v-card>
              </v-flex>
              </v-card>
            </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'FinalPlan',
  props: ['choiceArray'],
  methods: {
    choose (option) {
      this.$emit('pickOption',option)
    },
    createobjects (choiceArray){

      if(choiceArray[1]!==0){
        for (let i = 0; i < choiceArray[1]; i++) {
          this.laptops['lap'+'i'] =[]
        }
      }
      if(choiceArray[1]!==0){
        for (let i = 0; i < choiceArray[2]; i++) {
          this.cellphones['cell'+'i'] =[]
        }
      }
    }
  },
  data: function () {
    return {
      laptops: {},
      cellphones: {},

      }
    },
    beforeMount(){
      this.createobjects(this.choiceArray)
   },


}
</script>

<style scoped>

</style>
