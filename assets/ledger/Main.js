import Transport from '@ledgerhq/hw-transport-u2f'
import AppBtc from '@ledgerhq/hw-app-btc'
import { getxpub } from '~/assets/ledger/getxpub.js'
const getPublicKeyLegar = async () => {
  const transport = await Transport.create()
  const btc = new AppBtc(transport)
  let main = "44'/0'/0'"
  let parent = "44'/0'/"
  const child = await btc.getWalletPublicKey(main)
  const parentledge = await btc.getWalletPublicKey(parent)
  const BTCxpubub = await getxpub(main, child, parentledge)
  return BTCxpubub
}

export { getPublicKeyLegar }
