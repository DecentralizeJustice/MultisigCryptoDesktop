console.log(process)
//
// const Transport = require('@ledgerhq/hw-transport-node-hid')
// const AppBtc = require('@ledgerhq/hw-app-btc')
// const getBtcAddress = async () => {
//   const transport = await Transport.create()
//   const btc = new AppBtc(transport)
//   const result = await btc.getWalletPublicKey("44'/0'/0'/0/0")
//   return result.bitcoinAddress
// }
// getBtcAddress().then(a => process.send(a))
// process.send('ran')
// process.on('message', (msg) => {
//   console.log('Message from parent:', msg)
// })

// let counter = 0
//
// setInterval(() => {
//   process.send({ counter: counter++, platfrom: process.platform })
// }, 1000)
