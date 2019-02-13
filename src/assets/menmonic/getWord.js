import { wordList } from '@/assets/menmonic/englWordList.js'

export function getWord (word) {
  if (wordList.hasOwnProperty(word)) {
    return { exist: true, value: wordList[word] }
  } else {
    return { exist: false }
  }
}
