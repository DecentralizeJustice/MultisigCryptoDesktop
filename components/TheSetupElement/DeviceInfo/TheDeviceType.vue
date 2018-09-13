<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card  flat>
            <v-card-title primary-title class="justify-center" >
              <div>
                <h3 class="headline pb-3" >Device Type:</h3>
              </div>
            </v-card-title>
            <v-layout align-center justify-space-around row fill-height>

              <v-flex xs6 sm4>
                <v-card  hover color='info' @click.native="choose('Trezor')">
                    <img class="pt-3" src="/trezor.jpg" alt="avatar" style="height: 50%; width: 50%;
                    display: block;margin-left: auto;margin-right: auto;" >
                  <v-card-title primary-title class="justify-center" >
                    <div>
                      <h3 class="headline" >Trezor</h3>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>

              <v-flex xs6 sm4>
                <v-card hover color='info' @click.native="choose('Other')">
                    <img src="/labtopcell.png" alt="avatar" style="height: 50%; width: 50%;
                    display: block;margin-left: auto;margin-right: auto;">
                  <v-card-title primary-title class="justify-center" >
                    <div>
                      <h3 class="headline" >Laptop, Phone, etc.</h3>
                    </div>
                  </v-card-title>
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
  name: 'TheDeviceNumber',
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    }
  },

}
</script>

<style scoped>

</style>
