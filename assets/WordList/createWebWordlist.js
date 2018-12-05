const bip39 = require('bip39')

export function createWebWordlist () {
  let mnemonic = bip39.generateMnemonic()
  return mnemonic
}
