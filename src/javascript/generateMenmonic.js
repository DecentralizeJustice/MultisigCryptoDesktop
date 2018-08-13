
const bip39 = require('bip39')
const crypto = require('crypto')
module.exports = {
  genMenmonic: genMenmonic
}
// as seen here https://github.com/bitcoinjs/bitcoinjs-lib/issues/583
function genMenmonic () {
  let randomBytes = crypto.randomBytes(16)
  let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
  return mnemonic
}
