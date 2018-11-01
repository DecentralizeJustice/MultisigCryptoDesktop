import { getXpub } from '~/assets/ledger/getxpub.js'
let BTCpath = "44'/0'/0'/0"
let ETCpath = "44'/60'/0'/0"
const getPublicKeyLegar = async () => {
  const BTCxpub = await getXpub(BTCpath)
  const ETCxpub = await getXpub(ETCpath)
  return { eth: ETCxpub, btc: BTCxpub }
}

export { getPublicKeyLegar }
