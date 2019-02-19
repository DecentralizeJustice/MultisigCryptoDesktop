
export function convertStringToObject (WordString) {
  let finalObject = {}
  for (var i = 1; i < 13; i++) {
    finalObject[i] = WordString[i]
  }
  return finalObject
}
