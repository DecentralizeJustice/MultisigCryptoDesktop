import TrezorConnect from 'trezor-connect'
import { supportedCoins as coins } from '~/assets/supportedCoins.js'

export { getPublicKey }
async function getPublicKey () {
  let xpub = {}
  let bundleVar = await getBundle(coins)
  let xpubBundle = await TrezorConnect.getPublicKey({
    bundle: bundleVar
  })
  xpub = parsePayload(xpubBundle.payload)
  return xpub
}

function getBundle (coins) {
  let bundle = []
  for (var prop in coins) {
    bundle.push({ 'path': coins[prop].currentPath })
  }
  return bundle
}

function parsePayload (payload) {
  let xpub = {}
  for (let i = 0; i < payload.length; i++) {
    let ticker = findTicker(payload[i].serializedPath, coins)
    xpub[ticker] = payload[i].xpub
  }
  return xpub
}

function findTicker (path, coins) {
  path = 'm/' + path
  let coin = ''
  for (var prop in coins) {
    if (coins[prop].currentPath === path) {
      coin = prop
      break
    }
  }
  return coin
}
