<template>
        <qrcode-stream  @decode="onDecode"></qrcode-stream>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'qrcodeScanner',
  components: {
    QrcodeStream
  },
  methods: {
    onDecode (decodedString) {
      this.$emit('scannedSuccess', decodedString)
    }
  }
}
</script>

<style scoped>

</style>
