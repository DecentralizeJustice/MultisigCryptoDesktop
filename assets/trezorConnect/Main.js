import TrezorConnect from 'trezor-connect'
import { supportedCoins as coins } from '~/assets/supportedCoins.js'

export { getPublicKey }
async function getPublicKey () {
  let xpub = {}
  for (var prop in coins) {
    xpub[prop] = await TrezorConnect.getPublicKey({
      path: coins[prop].currentPath,
      coin: prop
    })
  }
  return xpub
}
