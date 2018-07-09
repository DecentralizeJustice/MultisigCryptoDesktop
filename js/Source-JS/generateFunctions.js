
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
    networkMap.set("Bitcoin", bitcoin.networks.testnet)
    var witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys)
    var witnessScriptHash = bitcoin.crypto.sha256(witnessScript)
    var redeemScript = bitcoin.script.witnessScriptHash.output.encode(witnessScriptHash)
    var redeemScriptHash = bitcoin.crypto.hash160(redeemScript)
    var scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash)
    var P2SHaddress = bitcoin.address.fromOutputScript(scriptPubKey, networkMap.get(network)) 
    return P2SHaddress
}

function createAddressArray(xpubArray,numOfAddresses,network){
    let addressArray=[]
    for (let i = 0; i < numOfAddresses; i++) {
        let pubkeyArray=xpubArray.map(element => {return (xpubToPubkey(element,i)) })
        addressArray.push(createSingleAddress(pubkeyArray,network))
    }
    return addressArray
}


function addQrCodeToPage(idOfDiv,infoToAd){
    QRCode.toCanvas(document.getElementById(idOfDiv),
    infoToAd,{ errorCorrectionLevel: 'L' })
}

async function createPDF(addressArray,mnemonic,pubkeyArray){
    const imgData = pdfImages.logoUrl
    let pdf = new jsPDF()
    pdf.addImage(imgData, 'JPEG', 05, 05, 120, 50)
    pdf = await addMultisigdata(pdf,addressArray)
    pdf = await place3rdMenmonicInfo(pdf,mnemonic)
    pdf = await place3PublicKeys(pdf,pubkeyArray)
    pdf.save('multisigAddresses.pdf')

}

async function addMultisigdata(pdf,addressArray){
    let posVar=[25,160]
    //Add index 0 early to avoid inefficiencies of checking in for loop
    pdf = await placeTextandQRcodeAddress(posVar[0],posVar[1],`${addressArray[0]}`,pdf,`${0}`)
    for (let i = 1; i < addressArray.length; i++) {
        posVar = positionFinder(posVar,i)
        pdf = await placeTextandQRcodeAddress(posVar[0],posVar[1],`${addressArray[i]}`,pdf,`${i}`)
    }
    return pdf
}


function positionFinder(position,index){
    let xOffSet=90
    let yOffSet=40

    if (index % 2) {
        position[0]=position[0]+xOffSet
    }
    else{
        position[0]=position[0]-xOffSet
        position[1]=position[1]+yOffSet
    }
    return position
}

async function placeTextandQRcodeAddress(xPos,yPos,text,pdf,index){
    qrcode= await createQRcodeUrl(text)
    pdf.addImage(qrcode, 'JPEG', xPos+19, yPos, 30, 30)
    pdf.setFontSize(10)
    pdf.text(xPos, yPos, text)
    pdf.text(xPos+10, yPos+14, index)
    return pdf
}

async function place3rdMenmonicInfo(pdf,mnemonic){
  const xPos=35
  const yPos=90
  qrcode= await createQRcodeUrl(mnemonic)
  pdf.addImage(qrcode, 'JPEG', xPos, yPos, 50, 50)
  pdf.setFontSize(15)
  pdf.text(xPos+9, yPos+1, "3rd Menmonic")
  return pdf
}

async function place3PublicKeys(pdf,pubkeyArray){
  const xPos=110
  const yPos=60
  pubKey0= await createQRcodeUrl(`${pubkeyArray[0]}`)
  pubKey1= await createQRcodeUrl(`${pubkeyArray[1]},`)
  pubKey2= await createQRcodeUrl(`${pubkeyArray[2]}`)
  pdf.addImage(pubKey0, 'JPEG', xPos, yPos, 35, 35)
  pdf.addImage(pubKey1, 'JPEG', xPos+50, yPos, 35, 35)
  pdf.addImage(pubKey1, 'JPEG', xPos+25, yPos+40, 35, 35)
  pdf.setFontSize(12)
  pdf.text(xPos+11, yPos, "0 XPub")
  pdf.text(xPos+61, yPos, "1 XPub")
  pdf.text(xPos+36, yPos+40, "2 XPub")
  return pdf
}

async function createQRcodeUrl(qrCodeInfo){
   const urlCode=await QRCode.toDataURL(qrCodeInfo)
   return  urlCode
}




