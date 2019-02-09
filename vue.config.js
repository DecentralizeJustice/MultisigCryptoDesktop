
module.exports = {
  configureWebpack: {
    externals: {
      'node-hid': 'commonjs node-hid',
      'usb': 'commonjs usb'
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
      }
    }
  }
}
