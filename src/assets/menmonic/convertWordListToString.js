
export function convertStringToObject (WordList) {
  let string = ''
  for (let i = 1; i < 13; i++) {
    string += WordList[i] + ' '
  }
  return string
}
