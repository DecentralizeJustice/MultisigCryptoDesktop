
const noUiSlider = require('nouislider')
const wNumb = require("wnumb")
const bitcoin = require('bitcoinjs-lib')
const Decimal = require('decimal.js')
const $ = require("jquery")
const QRCode = require('qrcode')
"use strict";

module.exports = {

	setUpSlider: setUpSlider,
	getFeeInfo: getFeeInfo,
	setupTooltips: setupTooltips,
	makeSureNotNegative: makeSureNotNegative,
	getAddress: getAddress,
	getSingleAddressInfo: getSingleAddressInfo,
	getCORS: getCORS,
	parseAddressData: parseAddressData,
	getByteCount: getByteCount,
	getByteCountWrapper:getByteCountWrapper,
  testcases: testcases,
  sliderChangeManual: sliderChangeManual,
  updateverything:updateverything,
  bytsame:bytsame,
  bytdown:bytdown,
  byteup:byteup,
  satoshiToBtc:satoshiToBtc,
  setuptransInfo:setuptransInfo,
  lockWrapper:lockWrapper,
  confirmSimpleTrans:confirmSimpleTrans,
  buildTransaction:buildTransaction,
  createDefaultTrans:createDefaultTrans,
  signTransaction:signTransaction,
  confirmDoubleTrans:confirmDoubleTrans,
  createqr:createqr,
  copyToClipboard:copyToClipboard,
  fillDivwithQr:fillDivwithQr,
  getAddressInfo:getAddressInfo,

};

  async function getFeeInfo(trans) {
 	let response = await fetch('https://api.blockcypher.com/v1/btc/main');
    let returnedFeeInfo=await response.json();
    let feePerByteHigh=Math.round(returnedFeeInfo.high_fee_per_kb/1000)
    let feePerByteMid=Math.round(returnedFeeInfo.medium_fee_per_kb/1000)
    let feePerByteLow=Math.round(returnedFeeInfo.low_fee_per_kb/1000)
    trans.recommendFees={highfee:feePerByteHigh, midfee:feePerByteMid,lowfee:feePerByteLow}
    return trans
  };
//quick empty address fix, fix later!!!!! quick fix only
  async function getAddressInfo(transInfo,xpubKeyString,addressIndex){
   
   transInfo=await getAddress(transInfo,xpubKeyString,addressIndex)

   let stuff=await getSingleAddressInfo(transInfo.addressInfo.address)
   console.log(stuff)
   await parseAddressData(stuff,transInfo)
   if (stuff.final_balance!==0){setuptransInfo(transInfo)} 
}


 function setupTooltips(fees){
  $( "#settolowfee" ).attr( "data-original-title","~"+fees.lowfee+" (sat/byte)" );
  $( "#settohighfee" ).attr( "data-original-title","~"+fees.highfee+" (sat/byte)" );
  $( "#settomidfee" ).attr( "data-original-title","~"+fees.midfee+" (sat/byte)" );
 };

 function makeSureNotNegative(numToCheck){
  if ((numToCheck)-5<0){return 0}
    else{return (numToCheck-5)
	}};


 function setUpSlider(feeIntel,keyboardSlider){


 noUiSlider.create(keyboardSlider, {
  start: [2],
  connect: [true, false],
  behaviour: 'tap-drag',
  tooltips: wNumb({ decimals: 0 }),
  range: {
    'min': 1,
    'max': 50
  },
  pips: {
    mode: 'count',
    values: 6,
    density: 2
  }
	})

  keyboard.noUiSlider.set(feeIntel.midfee);
  keyboardSlider.noUiSlider.updateOptions({
    range: {
      'min': makeSureNotNegative(feeIntel.lowfee),
      'max': feeIntel.highfee+10
    },
    pips: {
      mode: 'count',
      values: 6,
      density: 4
    }
  })
    keyboardSlider.noUiSlider.on('end.one', function(){
  		sliderChangeManual(); 
	});

};


async function getSingleAddressInfo(adress){
  let request = await getCORS(`https://api.blockcypher.com/v1/btc/test3/addrs/${adress}?unspentOnly=true`)
  return request
  }


async function getCORS(url) {
    let response=await fetch(url)
  	return response.json()
}; 



function parseAddressData(rawdata,transInfo){

  let transactionssum=Decimal(0);
  let transhashindex=[];
  let cleandata=rawdata;



  if (cleandata.balance==0){
      walletIsEmpty();
      return
  };
    let numInputs=cleandata.txrefs.length;
  for (let i = 0; i < numInputs; i++) { 
      transactionssum = Decimal(cleandata.txrefs[i].value).plus(transactionssum);
      transhashindex.push([cleandata.txrefs[i].tx_hash,cleandata.txrefs[i].tx_output_n,cleandata.txrefs[i].value]) 
  };

  transInfo.addressInfo.balance= transactionssum
  transInfo.addressInfo.transactions= transhashindex
  transInfo.addressInfo.numInputs=numInputs
  transInfo.byteSize=Decimal(getByteCountWrapper(numInputs,1))
  transInfo.feeAmount=Decimal(transInfo.byteSize).times(Decimal(transInfo.recommendFees.midfee))
  transInfo.amountToSend=(Decimal(transInfo.addressInfo.balance).minus(Decimal(transInfo.feeAmount)))
};

function getAddress(transInfo,xpubkeyArray,addressIndex){

  pubkeyArray=xpubArrayToPubkeyArray(xpubkeyArray,addressIndex)
  transInfo.addressInfo.address=publicKeyArrayToAddress(pubkeyArray)
  transInfo.addressInfo.pubkeys= pubkeyArray
  return transInfo
}

function publicKeyArrayToAddress(publickeyarray){
  var pubKeys = [publickeyarray[0],publickeyarray[1],
  publickeyarray[2]].map(function (hex) { return Buffer.from(hex, 'hex') })
  let witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys)
  let redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
  let scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
  let P2SHaddress = bitcoin.address.fromOutputScript(scriptPubKey, bitcoin.networks.testnet)

  return P2SHaddress
}

 function xpubArrayToPubkeyArray(xpubkeyArray,index){
  let pubKeyArry= [xpubkeyArray[0],xpubkeyArray[1],
    xpubkeyArray[2]].map((element) => xpubToPubkey(element,index))

  return pubKeyArry

}

function xpubToPubkey(xpub,index){
    let node = bitcoin.HDNode.fromBase58(xpub)
    let pubkey = node.derive(index).getPublicKeyBuffer()
    return pubkey
}
//get transactions size from https://gist.github.com/dabura667/1bb77d63d38bfd99a0ce453db74e0115
// Usage:
// getByteCount({'MULTISIG-P2SH:2-4':45},{'P2PKH':1}) Means "45 inputs of P2SH Multisig and 1 output of P2PKH"
// getByteCount({'P2PKH':1,'MULTISIG-P2SH:2-3':2},{'P2PKH':2}) means "1 P2PKH input and 2 Multisig P2SH (2 of 3) inputs along with 2 P2PKH outputs"
function getByteCount(inputs, outputs) {
    var totalWeight = 0
    var hasWitness = false
    // assumes compressed pubkeys in all cases.
    var types = {
        'inputs': {
            'MULTISIG-P2SH': 49 * 4,
            'MULTISIG-P2WSH': 6 + (41 * 4),
            'MULTISIG-P2SH-P2WSH': 6 + (76 * 4),
            'P2PKH': 148 * 4,
            'P2WPKH': 108 + (41 * 4),
            'P2SH-P2WPKH': 108 + (64 * 4)
        },
        'outputs': {
            'P2SH': 32 * 4,
            'P2PKH': 34 * 4,
            'P2WPKH': 31 * 4,
            'P2WSH': 43 * 4
        }
    }

    Object.keys(inputs).forEach(function(key) {
        if (key.slice(0,8) === 'MULTISIG') {
            // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
            var keyParts = key.split(':')
            if (keyParts.length !== 2) throw new Error('invalid input: ' + key)
            var newKey = keyParts[0]
            var mAndN = keyParts[1].split('-').map(function (item) { return parseInt(item) })

            totalWeight += types.inputs[newKey] * inputs[key]
            var multiplyer = (newKey === 'MULTISIG-P2SH') ? 4 : 1
            totalWeight += ((73 * mAndN[0]) + (34 * mAndN[1])) * multiplyer * inputs[key]
        } else {
            totalWeight += types.inputs[key] * inputs[key]
        }
        if (key.indexOf('W') >= 0) hasWitness = true
    })

    Object.keys(outputs).forEach(function(key) {
        totalWeight += types.outputs[key] * outputs[key]
    })

    if (hasWitness) totalWeight += 2

    totalWeight += 10 * 4

    return Math.ceil(totalWeight / 4)
}

function getByteCountWrapper(numInputs,numOutputs){
  return getByteCount({'MULTISIG-P2SH-P2WSH:3-3':numInputs},{'P2WSH':numOutputs})
}


function testcases(proposed){ 
  hideAllWarnigns();
  // inputs !=ouptus
  if(!(Decimal(proposed.amountToSend).plus(proposed.feeAmount).plus(proposed.changeAmount)
      .equals(proposed.addressInfo.balance))){
    $("#toolittle").show();
    return false;
    };

  //<resonable fee
   if (Decimal(makeSureNotNegative(proposed.recommendFees.lowfee))
        .greaterThan(Decimal(proposed.feeAmount).div(proposed.byteSize))) {
    $("#minerfeetoolittle").show();
    return false;
  }

  //fee too high to fit on range
  if((proposed.recommendFees.highfee+10)<(Decimal(proposed.feeAmount).div(proposed.byteSize))) {
    $("#feetoohigh").show();
      return false;}
  
  //change too low
  if (proposed.changeAmount!=0){
    if(proposed.changeAmount<(getByteCountWrapper(proposed.addressInfo.numInputs,2)-
      getByteCountWrapper(proposed.addressInfo.numInputs,1))){
      $("#changeadresstoolittle").show();
        return false;}
  };

  //<low fee recommended but allow
  if(proposed.recommendFees.lowfee>(Decimal(proposed.feeAmount).div(proposed.byteSize))) {
    $("#youreallyshouldnot").show();
   };
  
  return true;      
};


function sliderChangeManual(transInfo){  
  let newFeeRate=keyboard.noUiSlider.get();
  let proposed=Object.assign({}, transInfo);
  proposed.feeAmount= Decimal(proposed.byteSize).times(Decimal(Math.round(newFeeRate)));
  if (proposed.changeAmount==0){
    proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.feeAmount));}
  else{
        if ($("#sendAmountDiv").find(".lockedButton").is(":visible")){
          proposed.changeAmount=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.amountToSend)).minus(Decimal(proposed.feeAmount));}
        else{
          proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(proposed.feeAmount).minus(proposed.changeAmount);
      };
  };

  if (testcases(proposed)){
      transInfo=proposed;
      updateverything(transInfo);}
  else{
    keyboard.noUiSlider.set((Decimal(transInfo.feeAmount).div(Decimal(transInfo.byteSize))));
      };
};

function updateverything(transInfo){
  //update amount to send

  $("#amount").val(satoshiToBtc(transInfo.amountToSend));
  //update the slider
  keyboard.noUiSlider.set(Math.round(Decimal(transInfo.feeAmount)/Decimal(transInfo.byteSize)));
  if (transInfo.changeAmount!=0){
  let btc=satoshiToBtc(transInfo.changeAmount);
  $("#change").text(Number(btc).toFixed(8).replace(/\.?0+$/,""));}

};

//if nothing changes, but the adress eg 321->3214
function bytsame(pro){
  transInfo=pro;
  };

function bytdown(proposed,transInfo){
  proposed.changeAmount=0;
  let oldratio=Decimal(transInfo.feeAmount).div(Decimal(transInfo.byteSize));
  proposed.byteSize=Decimal(getByteCountWrapper(proposed.addressInfo.numInputs,1))
  proposed.feeAmount=Decimal(proposed.byteSize).times(Decimal(oldratio))
  proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.feeAmount))

   if (testcases(proposed)){
      transInfo=proposed;
      updateverything(transInfo);
      $("#changinfo").fadeOut();
      $("#sendAmountDiv").fadeOut();
      $("#changeAmountDiv").fadeOut();
              
   }else{
     $("#changeadress").val(transInfo.changeAddress); 
     return;
      };
};

function  hideAllWarnigns(){
      $("#minerfeetoolittle").hide();
      $("#toolittle").hide();
      $("#youreallyshouldnot").hide();
      $("#feetoohigh").hide();
      $("#changeadresstoolittle").hide();      
};

function walletIsEmpty(){
  $(".emptywallet").show();
  $("#loader").hide();
};

function btcToSatoshi(btc){
  return (Decimal(btc).div(Decimal(0.00000001)));
};

function satoshiToBtc(sat){
  return (Decimal(sat).times(Decimal(0.00000001)));
};


   


//Lock status related code
function showLockImg(divToLock){
  $(divToLock).find(".unlockedimg").fadeOut( "fast", function() {
    $(divToLock).find(".lockedimg").fadeIn( "fast");
});};


function showUnLockImg(divToUnlock){
  $(divToUnlock).find(".lockedimg").fadeOut( "fast", function() {
    $(divToUnlock).find(".unlockedimg").fadeIn( "fast");
});};


function lockThisDivSwitch(div){
  $(div).find(".unlockedButton").fadeOut("fast",function(){
    $(div).find(".lockedButton").fadeIn();
});};

function unlockThisDivSwitch(div){
  $(div).find(".lockedButton").fadeOut("fast",function(){
    $(div).find(".unlockedButton").fadeIn();
});};


function isThisLocked(divToCheck){
  let divStatus=$(divToCheck).find(".lockedButton").is(":visible");
  if (divStatus){return true}
    else{return false}
};
function getOtherLockDiv(clickedDiv){
  let jquerydiv=$(clickedDiv).attr('id')
   if(jquerydiv==="changeAmountDiv"){
    return sendAmountDiv
   }else{
    return changeAmountDiv
}};

function lockWrapper(divToLock){
  let otherDiv=getOtherLockDiv(divToLock);
  
  if (isThisLocked(divToLock)){
    unlockThisDivSwitch(divToLock);
    showUnLockImg(divToLock);
    lockThisDivSwitch(otherDiv);
    showLockImg(otherDiv);

  }else{
    lockThisDivSwitch(divToLock);
    showLockImg(divToLock);
    unlockThisDivSwitch(otherDiv);
    showUnLockImg(otherDiv);

};}

//helper function for if adress add causes bytes to go up eg __->321
function byteup(proposed,transInfo){
  let oldratio=Decimal(transInfo.feeAmount).div(Decimal(transInfo.byteSize));
  proposed.byteSize=Decimal(getByteCountWrapper(proposed.addressInfo.numInputs,2))
  proposed.changeAmount=oldratio.times(Decimal(proposed.byteSize).minus(Decimal(transInfo.byteSize)));
  proposed.feeAmount=Decimal(proposed.byteSize).times(oldratio);
  proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.changeAmount)).minus(Decimal(proposed.feeAmount))
   if (testcases(proposed)){
      transInfo=proposed;
      updateverything(transInfo);
      $("#changinfo").fadeIn();
      $("#changeAmountDiv").fadeIn();
      $("#sendAmountDiv").fadeIn();
              
   }else{
     $("#changeadress").val(transInfo.changeAddress); 
     return;
      };
  };

  function setuptransInfo(transInfo){
  $("#Singleinfo").hide();
  $("#gooffline").show();
  $("#Balance").text(satoshiToBtc(transInfo.addressInfo.balance).toString()+" BTC");
  $("#amount").val(Decimal(transInfo.amountToSend).times(Decimal(0.00000001)));
  $("#linktoadress").attr("href","https://testnet.smartbit.com.au/address/"+transInfo.addressInfo.address);
};

function confirmSimpleTrans(transaction){
  let btcAmount=satoshiToBtc(transaction.amountToSend);
  let btcSendAddress= "adfaa235435wtvv"
  let feeInSatoshi=transaction.feeAmount/transaction.byteSize
  $("#sendInfo").html(`${btcAmount} BTC`)
  $("#sendToWhichAdressInfo").html(`${btcSendAddress}`)
  $("#sendFeeInfo").html(`~${feeInSatoshi} sat/byte`)
  $("#singleTrans").show()
};
function buildTransaction(transaction,txb){
    let pubKeys= [
      transaction.addressInfo.pubkeys[0],
      transaction.addressInfo.pubkeys[1],
      transaction.addressInfo.pubkeys[2]
    ].map(function (hex) { return Buffer.from(hex, 'hex') })
    var witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys) // 3 of 3
    var redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
    
    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
    for (let i = 0; i < (transaction.addressInfo.transactions.length-0); i++){
    txb.addInput(transaction.addressInfo.transactions[i][0],transaction.addressInfo.transactions[i][1],null, scriptPubKey);
    }
    
    txb.addOutput ("mqgSLgUyDSwPG387ePKKXSLMXnWKrxDur5",Decimal(transaction.amountToSend).toNumber());
    if (transaction.advancedOptions && transaction.changeAddress!=""){
      txb.addOutput ("mmC4uVA4nP1EbK1eryxtXQRCkfCXNUhPWh",Decimal(transaction.changeAmount).toNumber());
    }
    }
function createDefaultTrans(transInfo){
  let defaultTrans=Object.assign({}, transInfo)
  defaultTrans.byteSize=getByteCountWrapper(defaultTrans.addressInfo.numInputs,1)
  defaultTrans.changeAmount=0
  defaultTrans.feeAmount=Decimal(defaultTrans.byteSize).times(defaultTrans.recommendFees.midfee)
  defaultTrans.amountToSend=Decimal(defaultTrans.addressInfo.balance).minus(defaultTrans.feeAmount)
  defaultTrans.advancedOptions=false
  return defaultTrans
}


function signTransaction(key,transaction,bitcoinjsTransaction){
    let pubKeys= [
      transaction.addressInfo.pubkeys[0],
      transaction.addressInfo.pubkeys[1],
      transaction.addressInfo.pubkeys[2]
    ].map(function (hex) { return Buffer.from(hex, 'hex') })

    var witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys) // 3 of 3
    var redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
    key=bitcoin.ECPair.fromWIF(key, bitcoin.networks.testnet);
    for (let i = 0; i < (transaction.addressInfo.transactions.length-0); i++){
        bitcoinjsTransaction.sign (i, key, redeemScript, null, transaction.addressInfo.transactions[i][2], witnessScript);
        };
    }
function confirmDoubleTrans(transaction){
  let mainBtcAmount=satoshiToBtc(transaction.amountToSend)
  let mainSendAddress="adfaa235435wtvv"
  let changeBtcAmount=satoshiToBtc(transaction.changeAmount)
  let changeSendAddress="fdaafaafdafadaf"
  let feeInSatoshi=transaction.feeAmount/transaction.byteSize
  $("#multipleMainSendAmount").html(`${mainBtcAmount} BTC`)
  $("#multipleMainAddress").html(`${mainSendAddress}`)
  $("#changeSendAmount").html(`${changeBtcAmount} BTC`)
  $("#changeAddress").html(`${changeSendAddress}`)
  $("#doubleTrans").show()
}

function createqr(transaction,txb){
  var canvas = document.getElementById('canvas')
  let txhex = txb.buildIncomplete().toHex();
  QRCode.toCanvas(canvas, `${transaction.addressInfo.pubkeys},${txhex}`,{ errorCorrectionLevel: 'L' }, function (error) {
    if (error) console.error(error)
    $("#canvas").show()
})}

function copyToClipboard(hexcode) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(hexcode).select();
  document.execCommand("copy");
  $temp.remove();
}

function fillDivwithQr(txb){
  let canvas = document.getElementById('showLastQrCode')
  let txhex = txb.build().toHex ();
  QRCode.toCanvas(canvas, `${txhex}`,{ errorCorrectionLevel: 'L' }, function (error) {
    if (error) console.error(error)
    $("#showLastQrCode").show()
})}




