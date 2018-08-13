
const bip39 = require('bip39')
const crypto = require('crypto')
module.exports = {
  genMenmonic: genMenmonic
}

function genMenmonic () {
  let randomBytes = crypto.randomBytes(16)
  let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
  return mnemonic
}
