import { supportedCoins as coins } from '~/assets/supportedCoins.js'
const bip32 = require('bip32')

export { getXpub }

function getXpub (mnemonics) {
  let xpubs = {}
  const numToRun = Object.keys(mnemonics).length + 1
  for (var i = 1; i < numToRun; i++) {
    const seed = mnemonics['menmonic' + i]
    const node = bip32.fromSeed(seed)
    const xpubkeys = getXpubset(node)
    xpubs['xpubset' + i] = xpubkeys
  }
  return xpubs
}

function getXpubset (node) {
  let xpubs = {}
  let tickerList = findTickers()
  for (var prop in tickerList) {
    xpubs[prop] = node.derivePath(tickerList[prop]).neutered().toBase58()
  }
  return xpubs
}

function findTickers () {
  let coinList = {}
  for (var prop in coins) {
    coinList[prop] = coins[prop].currentPath
  }
  return coinList
}
