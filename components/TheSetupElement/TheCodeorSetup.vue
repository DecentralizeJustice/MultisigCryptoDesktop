<template>
<v-content>
     <v-container  fluid fill-height>
       <v-layout align-center justify-center wrap>

         <v-flex xs12 md4>
           <v-card hover @click.native="pickOption('1stStepSetup')">
             <v-img
               src="/1stdevicesetup.jpg" aspect-ratio="2"
              ></v-img>
             <v-card-title primary-title class="justify-center" >
               <div>
                 <h3 class="headline pb-3" >1st Device Setup</h3>
               </div>
             </v-card-title>
           </v-card>
        </v-flex>

        <v-flex xs12 md4 offset-md1 >
          <v-card hover @click.native="pickOption('SyncefromCode')">
            <v-img src="/passwordenter.jpeg"  aspect-ratio="2" ></v-img>
            <v-card-title primary-title class="justify-center">

                <h3 class="headline pb-3" >Use QR Code</h3>

            </v-card-title>
          </v-card>
       </v-flex>

       </v-layout>

     </v-container>
     <v-flex  text-xs-center xs1 align-center>
     <v-layout justify-space-around>
       <v-toolbar color='dark'>
             <v-icon large color='secondary' @click.native="back()">arrow_back</v-icon>
             <v-spacer></v-spacer>
             <v-icon large color='secondary'>help</v-icon>
        </v-toolbar>
     </v-layout>
     </v-flex>
   </v-content>
</template>

<script>
export default {
  name: 'TheCodeorSetup',
  methods: {
    pickOption (option) {
      this.$emit('pickOption', option)
    },
    back () {
      this.$emit('back')
    }
  }

}
</script>

<style scoped>

</style>
