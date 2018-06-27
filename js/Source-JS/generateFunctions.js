
const bip39 = require('bip39')
const secureRandom= require('secure-random')
const bitcoin = require('bitcoinjs-lib')
const jspdf = require('jsPdf')




module.exports = {
genMenmonic:genMenmonic,

}

//Random Numbers from https://www.npmjs.com/package/secure-random
function rng () { return secureRandom(32, {type: 'Buffer'}) }

function genMenmonic(phraseLenght,coin){
    let numMap = new Map()
    numMap.set(12, 16);numMap.set(15, 20);numMap.set(18, 24);
    numMap.set(21, 28);numMap.set(24, 32)
    length=numMap.get(phraseLenght)
    let mnemonic = bip39.entropyToMnemonic(secureRandom(length, {type: 'Array'}))
    let seed = bip39.mnemonicToSeed(mnemonic)
    let node = bitcoin.HDNode.fromSeedBuffer(seed)
    let path = returnCorrectPath(coin)
    child1 = node.derivePath(path).neutered().toBase58()
    return [mnemonic,child1]
  }

function returnCorrectPath(coin){
	let numMap = new Map()
    numMap.set("Litecoin", "m/44'/2'/0'/0");numMap.set("Bitcoin", "m/44'/0'/0'/0");
    numMap.set("Ethereum", "m/44'/60'/0'/0");
	let path = numMap.get(coin)
	return path
}