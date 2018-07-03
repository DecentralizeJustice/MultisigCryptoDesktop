
const bip39 = require('bip39')
const secureRandom= require('secure-random')
const bitcoin = require('bitcoinjs-lib')
const jsPDF = require('jsPdf')
const QRCode = require('qrcode')
const pdfImages= require("./pdfImages.js")



module.exports = {
genMenmonic:genMenmonic,
createAddressArray:createAddressArray,
createPDF:createPDF,
addQrCodeToPage:addQrCodeToPage,
}

//Random Numbers from https://www.npmjs.com/package/secure-random
function rng () { return secureRandom(32, {type: 'Buffer'}) }

function genMenmonic(phraseLenght,coin){
    let numMap = new Map()
    numMap.set(12, 16);numMap.set(15, 20);numMap.set(18, 24);
    numMap.set(21, 28);numMap.set(24, 32)
    let length=numMap.get(phraseLenght)
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


function xpubToPubkey(xpub,index){
    let node = bitcoin.HDNode.fromBase58(xpub)
    let pubkey = node.derive(index).getPublicKeyBuffer()
    return pubkey
}

function createSingleAddress(pubKeys,network){
    let networkMap = new Map()
    networkMap.set("bitcoin", bitcoin.networks.testnet)
    let witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys)
    let redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
    let scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
    let P2SHaddress = bitcoin.address.fromOutputScript(scriptPubKey, networkMap.network )
    return P2SHaddress
}

function createAddressArray(xpubArray,numOfAdresses,network){
    let adressArray=[]
    for (let i = 0; i < numOfAdresses; i++) {
        let pubkeyArray=xpubArray.map(element => {return (xpubToPubkey(element,i)) })
        adressArray.push(createSingleAddress(pubkeyArray,network))
    }
    return adressArray
}


function addQrCodeToPage(idOfDiv,infoToAd){
    QRCode.toCanvas(document.getElementById(idOfDiv),
    infoToAd,{ errorCorrectionLevel: 'L' })
}

async function createPDF(){
    let imgData = pdfImages.logoUrl
    let url= await createQRcodeUrl("ttt")
    let doc = new jsPDF()
    doc.addImage(imgData, 'JPEG', 05, 05, 120, 50)
    doc.addImage(url, 'JPEG', 05, 50, 30, 30)
    doc.save('multisigAdresses.pdf')

}

async function createQRcodeUrl(qrCodeInfo){
   let urlCode=await QRCode.toDataURL(qrCodeInfo)
   return  urlCode
}

createPDF()


