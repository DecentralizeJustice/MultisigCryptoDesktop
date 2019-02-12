import TransportNodeHid from '@ledgerhq/hw-transport-node-hid'
import AppBtc from '@ledgerhq/hw-app-btc'
const getBtcAddress = async () => {
  const transport = await TransportNodeHid.open('')
  console.log('ran')
  const btc = new AppBtc(transport)
  const result = await btc.getWalletPublicKey("44'/0'/0'/0/0")
  return result.bitcoinAddress
}

export { getBtcAddress }
