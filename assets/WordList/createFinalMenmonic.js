const bip39 = require('bip39')

export function createFinalMenmonic (dict1, dict2) {
  let entropyString = ''
  for (let i = 1; i < 13; i++) {
    entropyString += combinewords(dict1[i], dict2[i])
  }
  entropyString = entropyString.substring(0, 128)
  let base16 = binaryToHex(entropyString).result
  entropyString = bip39.entropyToMnemonic(base16)
  return entropyString
}

function combinewords (Word1, Word2) {
  let finalWord = ''
  for (let i = 0; i < Word1.length; i++) {
    finalWord += xor(Word1[i], Word2[i])
  }
  return finalWord
}

function xor (bit1, bit2) {
  if (bit1 === bit2) {
    return '0'
  } else {
    return '1'
  }
}

function binaryToHex (s) {
  var i; var k; var part; var accum; var ret = ''
  for (i = s.length - 1; i >= 3; i -= 4) {
    // extract out in substrings of 4 and convert to hex
    part = s.substr(i + 1 - 4, 4)
    accum = 0
    for (k = 0; k < 4; k += 1) {
      if (part[k] !== '0' && part[k] !== '1') {
        // invalid character
        return { valid: false }
      }
      // compute the length 4 substring
      accum = accum * 2 + parseInt(part[k], 10)
    }
    if (accum >= 10) {
      // 'A' to 'F'
      ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret
    } else {
      // '0' to '9'
      ret = String(accum) + ret
    }
  }
  // remaining characters, i = 0, 1, or 2
  if (i >= 0) {
    accum = 0
    // convert from front
    for (k = 0; k <= i; k += 1) {
      if (s[k] !== '0' && s[k] !== '1') {
        return { valid: false }
      }
      accum = accum * 2 + parseInt(s[k], 10)
    }
    // 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
    ret = String(accum) + ret
  }
  return { valid: true, result: ret }
}
