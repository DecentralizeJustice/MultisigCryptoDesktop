import { wordList } from '~/assets/WordList/englishWordlist.js'

export function getWord (word) {
  if (wordList.hasOwnProperty(word)) {
    return { exist: true, value: wordList[word] }
  } else {
    return { exist: false }
  }
}
