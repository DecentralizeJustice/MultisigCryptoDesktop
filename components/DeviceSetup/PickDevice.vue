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
                        <div style="color: black;">
                          <h2 >Type: {{deviceType(item)}}</h2>
                          <div v-if="iteminfo(item).type=='lap'">
                            <h3 >Number of Hardware Wallets: {{iteminfo(item).hardwarewallets}}</h3>
                          </div>
                        </div>
                       </v-card-title>


                           <v-btn large  class="text-xs-center" color='success' round
                           @click.native="choose(item)">
                               Select
                           </v-btn>


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
      choose (option) {
      this.$emit('pickOption',option)
      },
      deviceType (num) {
        let device =this.devices["device"+num]
        if (device.type==='cell'){
          return "Cellphone"
        }else {
          return "Labtop"
        }
      },
      getOrdinal (num) {
        num =parseInt(num, 10);
        if(num===0){return '1st'}
        if(num===1){return '2nd'}
        if(num===2){return '3rd'}
      },
      iteminfo (num) {
        return this.devices["device"+num]
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
