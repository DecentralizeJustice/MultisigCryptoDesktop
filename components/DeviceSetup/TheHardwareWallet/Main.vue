<template>

  <v-layout align-center >
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
        <v-card  hover color='clear' @click.native="selectWallet ()">
          <v-toolbar>
            <v-layout row wrap align-center>
              <v-flex headline class="text-xs-center">
                Sync Wallet
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
  </v-layout>

</template>

<script>
import { getPublicKey } from '~/assets/trezorConnect/Main.js'
import { getPublicKeyLegar } from '~/assets/ledger/Main.js'
export default {
  name: 'HardwareWalletSetup',
  props: ['number'],
  methods: {
    choose (option) {
      this.choiceArray.push(option)
    },
    shouldThisShow (index) {
      if (index === this.choiceArray.length) { return true }
      return false
    },
    finalChoice () {
      this.$emit('pickOption', this.choiceArray)
    },
    setupTrez () {
      var promise1 = Promise.resolve(getPublicKey())

      promise1.then(function (value) {
        console.log(value)
      })

      // getPublicKey()
    },
    setupLedgar () {
      var promise1 = Promise.resolve(getPublicKeyLegar())

      promise1.then(function (value) {
        console.log(value)
      })
    },
    selectWallet () {
      if (this.choiceArray[0] === 'Ledger') {
        this.setupLedgar()
      } else if (this.choiceArray[0] === 'Trezor') {
        this.setupTrez()
      }
    }

  },
  computed: {
    numberstuff: function () {
      if (this.number === 1) { return '1st' }
      if (this.number === 2) { return '2nd' }
      if (this.number === 3) { return '3rd' }
    },
    imagestuff: function () {
      if (this.choiceArray[0] === 'Trezor') { return './trezor.jpg' }
      if (this.choiceArray[0] === 'Ledger') { return './ledgar.jpg' }
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
