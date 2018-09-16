<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card>
            <v-toolbar>
        <v-spacer></v-spacer>
        <v-toolbar-title>Setup {{numberstuff}} Hardware Wallet</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
     <v-img
       src="/hardwares.jpg"
       aspect-ratio="4"
     ></v-img>
     <div v-if="shouldThisShow (0)">
     <v-card-title primary-title class="justify-center" >
       <div>
         <h3 class="headline pb-3" >Hardware Wallet Type:</h3>
       </div>
     </v-card-title>
     <v-layout align-center justify-space-around row fill-height pb-5 wrap>
       <v-flex xs12 sm3 >
         <v-card  hover color='clear' @click.native="choose('Ledger')">
           <v-toolbar>
             <v-layout row wrap align-center>
               <v-flex headline class="text-xs-center">
                 Ledger
               </v-flex>
             </v-layout>
           </v-toolbar>
            <v-img src="/ledgar.jpg" aspect-ratio="1.5"></v-img>
         </v-card>
       </v-flex>
       <v-flex xs12 sm3 >
         <v-card  hover color='clear' @click.native="choose('Trezor')">
            <v-toolbar>
              <v-layout row wrap align-center>
                <v-flex headline class="text-xs-center">
                  Trezor
                </v-flex>
              </v-layout>
            </v-toolbar>
            <v-img src="/trezor.jpg" aspect-ratio="1.5"></v-img>
         </v-card>
       </v-flex>
     </v-layout>
   </div>
   <div v-if="shouldThisShow (1)">
   <v-card-title primary-title class="justify-center" >
     <div>
       <h3 class="headline pb-3" >Plug In Wallet to Setup</h3>
     </div>
   </v-card-title>
   <v-layout align-center justify-space-around row fill-height pb-5 wrap>
     <v-flex xs12 sm3 >
       <v-card  hover color='clear' @click.native="choose('Get xpubs')">
         <v-toolbar>
           <v-layout row wrap align-center>
             <v-flex headline class="text-xs-center">
               Setup Wallet
             </v-flex>
           </v-layout>
         </v-toolbar>
          <v-img :src="imagestuff" aspect-ratio="1.5"></v-img>
       </v-card>
     </v-flex>
   </v-layout>
 </div>
   </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'HardwareWalletSetup',
  props: ['number'],
  methods: {
    choose(option){
      this.choiceArray.push(option)
      alert(this.choiceArray)
    },
    shouldThisShow (index) {
      if(index!==this.choiceArray.length){return false}
      return true
    }
  },
  computed: {
  numberstuff: function () {
    if(this.number===1){return '1st'}
    if(this.number===2){return '2nd'}
    if(this.number===3){return '3rd'}
  },
  imagestuff: function () {
    if(this.choiceArray[0]==='Trezor'){return './trezor.jpg'}
    if(this.choiceArray[0]==='Ledger'){return './ledgar.jpg'}
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
