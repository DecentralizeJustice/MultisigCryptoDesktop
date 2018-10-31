import Transport from '@ledgerhq/hw-transport-u2f'
import AppBtc from '@ledgerhq/hw-app-btc'
const getPublicKeyLegar = async () => {
  const transport = await Transport.create()
  const btc = new AppBtc(transport)
  const result = await btc.getWalletPublicKey("44'/0'/0'/0/0")
  return result.bitcoinAddress
}

export { getPublicKeyLegar }
