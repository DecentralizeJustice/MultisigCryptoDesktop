<template>
<v-content>
     <v-container  fluid fill-height>
       <v-layout align-center justify-center wrap>

         <v-flex xs12 md4>
           <v-card hover @click.native="pickOption('Setup')">
             <v-img
               src="/setup.jpeg" aspect-ratio="2"
              ></v-img>
             <v-card-title primary-title class="justify-center" >
               <div>
                 <h3 class="headline pb-3" >Setup Device</h3>
               </div>
             </v-card-title>
           </v-card>
        </v-flex>

        <v-flex xs12 md4 offset-md1 >
          <v-card hover @click.native="pickOption('Quicktools')">
            <v-img src="/tools.jpeg"  aspect-ratio="2" ></v-img>
            <v-card-title primary-title class="justify-center">
              <div>
                <h3 class="headline pb-3" >Quick Tools</h3>
              </div>
            </v-card-title>
          </v-card>
       </v-flex>

       </v-layout>
     </v-container>
   </v-content>
</template>

<script>
export default {
  name: 'TheSetupDeviceIntro',
  methods: {
    pickOption (option) {
      this.$emit('pickOption', option)
    }
  },

}
</script>

<style scoped>

</style>
