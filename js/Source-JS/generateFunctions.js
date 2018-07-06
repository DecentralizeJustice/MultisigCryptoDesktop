
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

async function createPDF(addressArray){
    let imgData = pdfImages.logoUrl
    let pdf = new jsPDF()
    pdf.setFontSize(10);
    pdf.addImage(imgData, 'JPEG', 05, 05, 120, 50)
    pdf = await addMultisigdata(pdf,addressArray)
    pdf.save('multisigAddresses.pdf')

}

async function addMultisigdata(doc,addressArray){
    let posVar=[25,70]
    //Add index 0 early to avoid inefficiencies of checking in for loop
    doc = await placeTextandQRcode(posVar[0],posVar[1],`${addressArray[0]}`,doc,`${0}`)
    for (let i = 1; i < addressArray.length; i++) {
        posVar = positionFinder(posVar,i)
        doc = await placeTextandQRcode(posVar[0],posVar[1],`${addressArray[i]}`,doc,`${i}`)
    }
    return doc
}


function positionFinder(Pos,index){
    let xOffSet=90
    let yOffSet=40

    if (index % 2) {
        Pos[0]=Pos[0]+xOffSet
    }
    else{
        Pos[0]=Pos[0]-xOffSet
        Pos[1]=Pos[1]+yOffSet
    }
    return Pos
}

async function placeTextandQRcode(xPos,yPos,text,doc,index){
    qrcode= await createQRcodeUrl(text)
    doc.addImage(qrcode, 'JPEG', xPos+19, yPos, 30, 30)
    doc.text(xPos, yPos, text)
    doc.text(xPos+10, yPos+14, index)
    return doc
}

async function createQRcodeUrl(qrCodeInfo){
   let urlCode=await QRCode.toDataURL(qrCodeInfo)
   return  urlCode
}




