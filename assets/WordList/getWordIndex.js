import { indexWordList } from '~/assets/WordList/englishWordlistIndex.js'

export function makeBinaryWordList (wordList) {
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
    let binary = convertFromBaseToBase(base2[i], 10, 2)
    base2[i] = paddIfNeed(binary)
  }
  return base2
}

function convertFromBaseToBase (str, fromBase, toBase) {
  let num = parseInt(str, fromBase)
  return num.toString(toBase)
}

function paddIfNeed (num) {
  if (num.length < 11) {
    let numToPad = 11 - num.length
    for (let i = 0; i < numToPad; i++) {
      num = '0' + num
    }
  }
  return num
}
