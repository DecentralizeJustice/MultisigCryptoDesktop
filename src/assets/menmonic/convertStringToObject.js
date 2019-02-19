
export function convertStringToObject (WordString) {
  let finalObject = {}
  let wordArray = WordString.split(' ')
  for (let i = 0; i < wordArray.length; i++) {
    finalObject[i + 1] = wordArray[i]
  }
  return finalObject
}
