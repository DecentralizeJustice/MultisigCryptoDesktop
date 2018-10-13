<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat>
            <v-img
              src="computer.jpg"
              aspect-ratio="4"
            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h3 class="headline pb-3" >Select Current Device: </h3>
              </div>
            </v-card-title>

            <v-container grid-list-md text-xs-center xs12>

                  <v-layout xs12  wrap justify-space-around row fill-height>

                  <v-flex xs12 sm3 v-for="item in avaibleOptions" :key="item">
                    <v-card color="white">
                      <v-toolbar color="black" >
                        <v-layout row wrap align-center>
                          <v-flex headline class="text-xs-center " >
                           {{getOrdinal(item)}} Device
                          </v-flex>
                        </v-layout>
                      </v-toolbar>
                      <v-card-title>
                         <div>
                           <h3 style="color: black;">Number of Hardware Wallets:</h3>
                         </div>
                       </v-card-title>
                       <v-layout row wrap class="text-xs-center" >
                         <v-flex>
                           <v-btn large  color='success' round>
                               Select
                           </v-btn>
                         </v-flex>
                       </v-layout>
                      </v-card>
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
//import TheSetupDeviceIntro from '~/components/TheSetupElement/TheDeviceorTools.vue'

export default {
  name: 'PickDevice',
  components: {

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
      },
      getOrdinal (num) {
        num =parseInt(num, 10);
        if(num===0){return '1st'}
        if(num===1){return '2nd'}
        if(num===2){return '3rd'}
      },
    },
    computed: {
        avaibleOptions  () {
          let taken = this.$store.state.setupInfo.takendevices
          let avaibleChoices = Object.keys(this.$store.state.setupInfo.finalDevicePlan).length
          var avaiArray = [];
          for (let i = 0; i <= avaibleChoices-1; i++) {
            if (!taken.includes(i)){
             avaiArray.push(i)
            }
          }
          return avaiArray
      },

    },
    data () {
      return {
        devices : this.$store.state.setupInfo.finalDevicePlan
      }
    }


}


</script>

<style scoped>

</style>
