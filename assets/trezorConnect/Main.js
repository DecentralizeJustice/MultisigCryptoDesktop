import TrezorConnect from 'trezor-connect'
let BTCpath = "m/44'/0'/0'/0"
let ETCpath = "m/44'/60'/0'/0"
// let coins = ['Btc','Eth']
export { getPublicKey }
async function getPublicKey () {
  let test = { btc: '', eth: '' }
  test['btc'] = await TrezorConnect.getPublicKey({
    path: BTCpath,
    coin: 'btc'
  })
  test['eth'] = await TrezorConnect.getPublicKey({
    path: ETCpath,
    coin: 'eth'
  })

  return test
}
