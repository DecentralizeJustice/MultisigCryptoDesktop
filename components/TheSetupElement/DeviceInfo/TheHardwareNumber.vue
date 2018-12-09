<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat>
            <v-img
              src="deviceoptions.jpg"
              aspect-ratio="3"
            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h3 class="headline pb-3" >Number of Hardware Wallets:</h3>
              </div>
            </v-card-title>
            <v-layout align-center justify-space-around row fill-height>

                <v-btn large flat round color='secondary' @click.native="choose(1)">
                  <h3 class="headline" >1</h3>
                </v-btn>
                <v-btn large flat round color='secondary' @click.native="choose(2)">
                  <h3 class="headline" >2</h3>
                </v-btn>

                </v-btn>

            </v-layout>
            <v-flex  text-xs-center xs1 align-center pb-2>
            <v-layout justify-space-around>
            <v-icon large color='secondary' @click.native="back()">arrow_back</v-icon>
            <v-icon large color='secondary'>help</v-icon>
            </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'TheHardwareNumber',
  methods: {
    choose (option) {
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
