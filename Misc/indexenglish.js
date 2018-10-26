var fs = require('fs')
var array = fs.readFileSync('english.txt').toString().split('\n')
var englishIndex = {}
let i = 0
for (i in array) {
  let word = array[i]
  englishIndex[word] = i
}
fs.writeFile('./data.json', JSON.stringify(englishIndex, null, 2), 'utf-8')
