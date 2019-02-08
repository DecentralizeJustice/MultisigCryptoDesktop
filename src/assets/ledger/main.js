import Transport from '@ledgerhq/hw-transport-node-hid'
import AppBtc from '@ledgerhq/hw-app-btc'
const getBtcAddress = async () => {
  const transport = await Transport.create()
  const btc = new AppBtc(transport)
  const result = await btc.getWalletPublicKey("44'/0'/0'/0/0")
  return result.bitcoinAddress
}

export { getBtcAddress }
