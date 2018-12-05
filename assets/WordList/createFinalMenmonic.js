const bip39 = require('bip39')

export function createFinalMenmonic (memString, passWordString) {
  let seed = bip39.mnemonicToSeed(memString, passWordString)
  return seed
}
