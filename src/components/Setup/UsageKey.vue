<template>

    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Scan Usage Key</h3>

          </div>
        </v-card-title>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
          <v-btn ><v-icon color="orange">help</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn >Confirm <v-icon color="green">done</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
  name: 'UsageKey',
  components: {
  QrcodeStream,
  QrcodeDropZone,
  QrcodeCapture
  },
  methods: {
    onDecode (decodedString) {
      console.log(decodedString)
    }
  }
}
</script>

<style scoped>

</style>
