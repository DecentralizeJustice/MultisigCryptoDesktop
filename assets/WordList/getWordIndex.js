import { indexWordList } from '~/assets/WordList/englishWordlistIndex.js'

export function combine2passphrases (wordList) {
  let wordList1 = indexTheWordList(wordList)
  let wordList2 = convertToBase2(wordList1)
  return wordList2
}

function indexTheWordList (wordList) {
  let wordListCopy = Object.assign({}, wordList)
  for (let i = 1; i < 13; i++) {
    wordListCopy[i] = indexWordList[wordListCopy[i]]
  }
  return wordListCopy
}

function convertToBase2 (wordList) {
  let base2 = Object.assign({}, wordList)
  for (let i = 1; i < 13; i++) {
    base2[i] = convertFromBaseToBase(base2[i], 10, 2)
  }
  return base2
}

function convertFromBaseToBase (str, fromBase, toBase) {
  let num = parseInt(str, fromBase)
  return num.toString(toBase)
}
