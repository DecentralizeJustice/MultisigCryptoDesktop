<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat row wrap>
            <v-img
              src="plan.jpg"
              aspect-ratio="5"
            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h1 >Confirm Final Plan</h1>
              </div>
            </v-card-title>

            <v-layout xs12  wrap justify-space-around row fill-height>

            <v-flex xs12 sm3>
              <v-card>
                <v-toolbar color="black" >
                  <v-layout row wrap align-center>
                    <v-flex headline class="text-xs-center">
                      Laptop 1
                    </v-flex>
                  </v-layout>
                </v-toolbar>
                <v-card-title>
                   <div>
                     <h3 >Number of Hardware Wallets:</h3>
                   </div>
                 </v-card-title>
                </v-card>
              </v-flex>

              <v-flex xs12 sm3 pb-3>
                <v-card  hover color='clear'>
                   <v-toolbar>
                     <v-layout row wrap align-center>
                       <v-flex headline class="text-xs-center">
                         Cellphone 1
                       </v-flex>
                     </v-layout>
                   </v-toolbar>
                   <v-img src="/trezor.jpg" aspect-ratio="1.5"></v-img>
                </v-card>
              </v-flex>
            </v-layout>
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
          this.laptops['lap'+i] =[]
        }
      }
      if(choiceArray[2]!==0){
        for (let i = 0; i < choiceArray[2]; i++) {
          this.cellphones['cell'+i] =[]
        }
      }
      //alert(this.cellphones['cell1'])
    },
    showOff (func) {
    return new Promise(
        function (resolve) {
            //this.createobjects(this.choiceArray)
            func
            resolve(this.cellphones['cell']+'l')
        }
    )
  },

  },
  data: function () {
    return {
      laptops: {},
      cellphones: {},
      }
    },
    beforeMount(){
      this.showOff(this.createobjects(this.choiceArray)).then(result =>
        alert(result) // 1
      )
   },


}
</script>

<style scoped>

</style>
