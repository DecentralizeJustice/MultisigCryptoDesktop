import { getXpub } from '../../assets/ledger/getxpub.js'
import { supportedCoins as coins } from '../../assets/supportedCoins.js'

async function getPublicKeyLegar () {
  let xpub = {}
  for (var prop in coins) {
    let goodPath = removeM(coins[prop].currentPath)
    xpub[prop] = await getXpub(goodPath)
  }
  return xpub
}
function removeM (path) {
  path = path.substring(2)
  return path
}
export { getPublicKeyLegar }
