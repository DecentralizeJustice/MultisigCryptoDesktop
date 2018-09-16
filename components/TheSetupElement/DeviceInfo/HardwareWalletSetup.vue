<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat>
            <v-img
              src="/deviceoptions.jpg"
              aspect-ratio="3"
            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h3 class="headline pb-3" >Number of Hardware Wallets:</h3>
              </div>
            </v-card-title>
            <v-layout align-center justify-space-around row fill-height>

                <v-btn large flat round color='secondary' @click.native="choose('HardwareWallets:1')">
                  <h3 class="headline" >1</h3>
                </v-btn>
                <v-btn large flat round color='secondary' @click.native="choose('HardwareWallets:2')">
                  <h3 class="headline" >2</h3>
                </v-btn>
                <v-btn large flat round color='secondary' @click.native="choose('HardwareWallets:3')">
                  <h3 class="headline" >3</h3>
                </v-btn>

            </v-layout>

          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'HardwareWalletSetup',
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    }
  }

}
</script>

<style scoped>

</style>
