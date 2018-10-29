const bip39 = require('bip39')

export function createWebWordlist () {
  let mnemonic = bip39.generateMnemonic()
  let wedDictWordList = createWebBase10List(mnemonic)
  return wedDictWordList
}

function createWebBase10List (menmonic) {
  let currentDictIndex = 1
  let dictionary = {}
  for (let i = 0; i < menmonic.length; i++) {
    if (menmonic[i] === ' ') {
      currentDictIndex = currentDictIndex + 1
    } else {
      dictionary = dictLogic(dictionary, menmonic[i], currentDictIndex)
    }
  }
  return dictionary
}

function dictLogic (dictionary, menmonicLetter, currentDictIndex) {
  if (currentDictIndex in dictionary) {
    dictionary[currentDictIndex] += menmonicLetter
  } else {
    dictionary[currentDictIndex] = menmonicLetter
  }
  return dictionary
}
