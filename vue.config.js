
module.exports = {
  configureWebpack: {
    externals: {
      'node-hid': 'commonjs node-hid',
      'usb': 'commonjs usb'
    }
  }
}
