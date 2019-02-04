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
      console.log(decodedString)
    }
  }
}
</script>

<style scoped>

</style>
