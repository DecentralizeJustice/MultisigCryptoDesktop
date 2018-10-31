import TrezorConnect from 'trezor-connect'

// let coins = ['Btc','Eth']
export { getPublicKey }
function getPublicKey () {
  let test = TrezorConnect.getPublicKey({
    path: "m/49'/0'/0'",
    coin: 'btc'
  })
  return test
}
