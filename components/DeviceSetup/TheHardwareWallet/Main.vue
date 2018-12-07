<template>

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
          <h3  >Hardware Wallet Type:</h3>
        </div>
      </v-card-title>
      <v-layout align-center justify-space-around row fill-height pb-5 wrap>
        <v-flex xs12 sm3 >
          <v-card  hover color='clear' @click.native="chooseWalletType('Ledger')">
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
          <v-card  hover color='clear' @click.native="chooseWalletType('Trezor')">
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
    <v-layout align-center justify-space-around row fill-height wrap>
      <v-flex xs12 sm3 class="text-xs-center">
        <v-card color='clear' >
          <v-toolbar>
            <v-layout row wrap align-center>
              <v-flex headline class="text-xs-center">
                {{getBoxTitle()}}
              </v-flex>
            </v-layout>
          </v-toolbar>
           <v-img :src="imagestuff" aspect-ratio="1.5"></v-img>
        </v-card>
        <v-btn :disabled='buttonLocked' round :large='true' color='success' v-on:click="selectWallet ()"
        v-if='true'><h3>Continue</h3></v-btn>
      </v-flex>
    </v-layout>
  </div>

  <v-flex  text-xs-center xs1 align-center pb-2>
  <v-layout justify-space-around>
  <v-icon large color='secondary' @click.native="back()">arrow_back</v-icon>
  <v-icon large color='secondary'>help</v-icon>
  </v-layout>
  </v-flex>

    </v-card>



</template>

<script>
import { getPublicKey } from '~/assets/trezorConnect/Main.js'
import { getPublicKeyLegar } from '~/assets/ledger/Main.js'
export default {
  name: 'HardwareWalletSetup',
  props: ['number'],
  methods: {
    chooseWalletType (option) {
      this.choiceObject['walletType'] = option
      this.choiceIndex += 1
    },
    back () {
      if (this.choiceIndex === 1) {
        this.choiceIndex -= 1
      } else {
        this.$emit('back')
      }
    },
    shouldThisShow (index) {
      if (index === this.choiceIndex) { return true }
      return false
    },
    finalChoice () {
      this.$emit('pickOption', this.choiceObject)
    },
    setupTrez: async function () {
      let keys = await getPublicKey()
      this.choiceObject['xPubs'] = keys
      if (!(Object.getOwnPropertyNames(this.choiceObject.xPubs).length === 0)) {
        this.finalChoice()
      }
    },
    setupLedgar: async function () {
      let keys = await getPublicKeyLegar()
      this.choiceObject['xPubs'] = keys
      if (!(Object.getOwnPropertyNames(this.choiceObject.xPubs).length === 0)) {
        this.finalChoice()
      }
    },
    getBoxTitle () {
      if (this.choiceObject['walletType'] === 'Ledger') {
        return 'Open Bitcoin App'
      } else if (this.choiceObject['walletType'] === 'Trezor') {
        return 'Sync Trezor'
      }
    },
    selectWallet () {
      this.buttonLocked = true
      if (this.choiceObject['walletType'] === 'Ledger') {
        this.setupLedgar()
      } else if (this.choiceObject['walletType'] === 'Trezor') {
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
      if (this.choiceObject['walletType'] === 'Trezor') { return './trezor.jpg' }
      if (this.choiceObject['walletType'] === 'Ledger') { return './ledgar.jpg' }
    }
  },
  data () {
    return {
      choiceIndex: 0,
      choiceObject: {},
      buttonLocked: false
    }
  }
}
</script>

<style scoped>

</style>
