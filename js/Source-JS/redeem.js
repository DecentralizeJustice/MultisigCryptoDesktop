
const $ = require("jquery")
const bitcoin = require('bitcoinjs-lib')
const request = require('request')
const QRCode = require('qrcode')
const noUiSlider = require('nouislider')
const Decimal = require('decimal.js')
const wNumb = require("wnumb")

$( document ).ready(function() {


//transacton global object
var transInfo= {
  changeAddress:"",
  changeAmount:Decimal(0),
  recommendFees:{},
  addressInfo:{},
  amountToSend:0,
  feeAmount:0,
  advancedOptions:false,

};
//trsaction global for bitcoin js
var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);


getFeeInfo()

function getFeeInfo(){
  request.get(`https://api.blockcypher.com/v1/btc/main`, function (error, response, body) {
    let returnedFeeInfo=JSON.parse(body)
    let feePerByteHigh=Math.round(returnedFeeInfo.high_fee_per_kb/1000)
    let feePerByteMid=Math.round(returnedFeeInfo.medium_fee_per_kb/1000)
    let feePerByteLow=Math.round(returnedFeeInfo.low_fee_per_kb/1000)
    transInfo.recommendFees={highfee:feePerByteHigh, midfee:feePerByteMid,lowfee:feePerByteLow}
    setupTooltips(transInfo.recommendFees)
    setUpSlider(transInfo.recommendFees)
});};



function setupTooltips(fees){
  $( "#settolowfee" ).attr( "data-original-title","~"+fees.lowfee+" (sat/byte)" );
  $( "#settohighfee" ).attr( "data-original-title","~"+fees.highfee+" (sat/byte)" );
  $( "#settomidfee" ).attr( "data-original-title","~"+fees.midfee+" (sat/byte)" );
};

function makeSureNotNegative(numToClean){
  if ((numToClean)-5<0){return 0}
    else{return (numToClean-5)
}};
function setUpSlider(feeIntel){
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
  });
};
//slider
var keyboardSlider = document.getElementById('keyboard');
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
});
//tooltips
jQuery('[data-toggle="tooltip"]').tooltip();
$("#setup").addClass("active");
$("#showadvancedoptions").hide();


$("#Bitcoin").click(function() {
  $("#firstq").hide();
  $("#Singleinfo").show();
});

$(".submitadressinfo1").click(function() {
    $(".submitadressinfo1").hide();
    $("#loader").show();
    getAddress();
});


function publickeyToAddress(publickeyarray){

  var pubKeys = [publickeyarray[0],publickeyarray[1],
  publickeyarray[2]].map(function (hex) { return Buffer.from(hex, 'hex') })
  var witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys)
  var witnessScriptHash = bitcoin.crypto.sha256(witnessScript)
  var redeemScript = bitcoin.script.witnessScriptHash.output.encode(witnessScriptHash)
  var redeemScriptHash = bitcoin.crypto.hash160(redeemScript)
  var scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash)
  var P2SHaddress = bitcoin.address.fromOutputScript(scriptPubKey, bitcoin.networks.testnet)
  return P2SHaddress
};

function getAddress(){
  //testing
  $("#btcpubkeys").val("029d5ea4ef0bbf9adb9cda8ab2eacd5c440f4e36999582e7484f27fef871011c5f,02bdffd977d271c0a72d2c9e563fdab34d94b7f7f9e69f64ca6cc0378bcbb18fa3,02f5c569bf4fd8ebb861507c238e2c2300c152edc2544d068d83e8ce75411a683e")
  pubkeyArray=($("#btcpubkeys").val()).split(",")    
  transInfo.addressInfo.address=publickeyToAddress(pubkeyArray)
  transInfo.addressInfo.pubkeys= pubkeyArray  
  getSingleAddressInfo(transInfo.addressInfo.address)
};

function getCORS(url, success) {
    var xhr = new XMLHttpRequest();
    if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
    xhr.open('GET', url);
    xhr.onload = success;
    xhr.send();
    return xhr;
}; 

function getSingleAddressInfo(adress){
  getCORS(`https://api.blockcypher.com/v1/btc/test3/addrs/${adress}?unspentOnly=true`, function(request){
      var response = request.currentTarget.response || request.target.responseText;
      return( parseAddressData(response));}) 
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
function getByteCountWrapper(numInputs,numOutputs){
  return getByteCount({'MULTISIG-P2SH-P2WSH:3-3':numInputs},{'P2WSH':numOutputs})
};
function parseAddressData(rawdata){

  let transactionssum=Decimal(0);
  let transhashindex=[];
  let cleandata=JSON.parse(rawdata);



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
  setuptransInfo() 
};

function setuptransInfo(){
  $("#Singleinfo").hide();
  $("#gooffline").show();
  $("#Balance").text(satoshiToBtc(transInfo.addressInfo.balance).toString()+" BTC");
  $("#amount").val(Decimal(transInfo.amountToSend).times(Decimal(0.00000001)));
  $("#linktoadress").attr("href","https://testnet.smartbit.com.au/address/"+transInfo.addressInfo.address);

};

   
$("#gotoadressinfo").click(function(){
  $("#gooffline").hide();
  $("#setuptrans").show();
});


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

$("#changeAmountDiv").click(function(){
  lockWrapper(this)
});

$("#sendAmountDiv").click(function(){
  lockWrapper(this)
});


//feebuttons 
$("#settomidfee").click(function(){
  keyboardSlider.noUiSlider.set(transInfo.recommendFees.midfee);
  sliderChangeManual();
});

$("#settolowfee").click(function(){
  keyboardSlider.noUiSlider.set(transInfo.recommendFees.lowfee);
  sliderChangeManual();
});

$("#settohighfee").click(function(){
  keyboardSlider.noUiSlider.set(transInfo.recommendFees.highfee);
  sliderChangeManual();
});

//control the fadeout of alerts
$(".alertstuff").click(function(){$(this).parent().fadeOut()});


//controls the send amount change
$("#amount").change(function(){
  
  let proposed=Object.assign({}, transInfo);

  if (Decimal(proposed.changeAmount).eq(0)){
    proposed.amountToSend=btcToSatoshi((Number($("#amount").val())).toFixed(8));
    proposed.feeAmount=Decimal(proposed.addressInfo.balance).minus(proposed.amountToSend);
    
    }else{
    proposed.amountToSend=btcToSatoshi((Number($("#amount").val())).toFixed(8));
    proposed.changeAmount=Decimal(proposed.addressInfo.balance).minus(proposed.amountToSend).minus(proposed.feeAmount);
  };
  
  if (testcases(proposed)){
    transInfo=proposed;
    updateverything();}
  else{
   $("#amount").val(satoshiToBtc(transInfo.amountToSend)); 
  };
});



//helper function for if adress add causes bytes to go up eg __->321
function byteup(proposed){
  let oldratio=Decimal(transInfo.feeAmount).div(Decimal(transInfo.byteSize));
  proposed.byteSize=Decimal(getByteCountWrapper(proposed.addressInfo.numInputs,2))
  proposed.changeAmount=oldratio.times(Decimal(proposed.byteSize).minus(Decimal(transInfo.byteSize)));
  proposed.feeAmount=Decimal(proposed.byteSize).times(oldratio);
  proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.changeAmount)).minus(Decimal(proposed.feeAmount))
   if (testcases(proposed)){
      transInfo=proposed;
      updateverything();
      $("#changinfo").fadeIn();
      $("#changeAmountDiv").fadeIn();
      $("#sendAmountDiv").fadeIn();
              
   }else{
     $("#changeadress").val(transInfo.changeAddress); 
     return;
      };
  };



function bytdown(proposed){
  proposed.changeAmount=0;
  let oldratio=Decimal(transInfo.feeAmount).div(Decimal(transInfo.byteSize));
  proposed.byteSize=Decimal(getByteCountWrapper(proposed.addressInfo.numInputs,1))
  proposed.feeAmount=Decimal(proposed.byteSize).times(Decimal(oldratio))
  proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.feeAmount))

   if (testcases(proposed)){
      transInfo=proposed;
      updateverything();
      $("#changinfo").fadeOut();
      $("#sendAmountDiv").fadeOut();
      $("#changeAmountDiv").fadeOut();
              
   }else{
     $("#changeadress").val(transInfo.changeAddress); 
     return;
      };
};

//if nothing changes, but the adress eg 321->3214
function bytsame(pro){
  transInfo=pro;
  };


$("#changeadress").change(function(){
  let proposed=Object.assign({}, transInfo);
  if($("#changeadress").val()!=""){
    proposed.changeAddress=$("#changeadress").val();

    if (transInfo.changeAddress==""){
    byteup(proposed);
    }
    else{bytsame(proposed)};

  }else{
      proposed.byteSize=Decimal(getByteCountWrapper(proposed.addressInfo.numInputs,1))
      proposed.changeAddress="";
      proposed.changeAmount=Decimal(0);
      proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.changeAmount)).minus(Decimal(proposed.feeAmount));
      bytdown(proposed);
  };
});

function sliderChangeManual(){  
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
      updateverything();}
  else{
    keyboard.noUiSlider.set((Decimal(transInfo.feeAmount).div(Decimal(transInfo.byteSize))));
      };
};
  
keyboard.noUiSlider.on('end.one', function(){
  sliderChangeManual(); 
});

$("#advancedoptions").change(function() {
  if(this.checked) {
    $("#showadvancedoptions").show();
    transInfo.advancedOptions=true
    }else{
      $("#showadvancedoptions").hide();
      transInfo.advancedOptions=false
    };
});

function  hideAllWarnigns(){
      $("#minerfeetoolittle").hide();
      $("#toolittle").hide();
      $("#youreallyshouldnot").hide();
      $("#feetoohigh").hide();
      $("#changeadresstoolittle").hide();      
};

function updateverything(){
  //update amount to send
  $("#amount").val(satoshiToBtc(transInfo.amountToSend));
  //update the slider
  keyboard.noUiSlider.set(Math.round(Decimal(transInfo.feeAmount)/Decimal(transInfo.byteSize)));
  if (transInfo.changeAmount!=0){
  let btc=satoshiToBtc(transInfo.changeAmount);
  $("#change").text(Number(btc).toFixed(8).replace(/\.?0+$/,""));}

};
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

function confirmSimpleTrans(transaction){
  let btcAmount=satoshiToBtc(transaction.amountToSend);
  let btcSendAddress= "adfaa235435wtvv"
  let feeInSatoshi=transaction.feeAmount/transaction.byteSize
  $("#sendInfo").html(`${btcAmount} BTC`)
  $("#sendToWhichAdressInfo").html(`${btcSendAddress}`)
  $("#sendFeeInfo").html(`~${feeInSatoshi} sat/byte`)
  $("#singleTrans").show()
};

function confimDoubleTrans(transaction){
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
};


function createDefaultTrans(){
  let defaultTrans=Object.assign({}, transInfo)
  defaultTrans.byteSize=getByteCountWrapper(defaultTrans.addressInfo.numInputs,1)
  defaultTrans.changeAmount=0
  defaultTrans.feeAmount=Decimal(defaultTrans.byteSize).times(defaultTrans.recommendFees.midfee)
  defaultTrans.amountToSend=Decimal(defaultTrans.addressInfo.balance).minus(defaultTrans.feeAmount)
  defaultTrans.advancedOptions=false
  return defaultTrans
};

$("#goToConfirmTrans").click(function(){
    if (!(transInfo.advancedOptions)){
      confirmSimpleTrans(createDefaultTrans())
      }else{
      if (transInfo.changeAddress==""){
        confirmSimpleTrans(transInfo)
      }else{confimDoubleTrans(transInfo)}}
    $("#setuptrans").hide()
    $("#confirmTrans").show()

});

$("#editTransaction").click(function(){
    $("#doubleTrans").hide()
    $("#singleTrans").hide()
    $("#confirmTrans").hide()
    $("#setuptrans").show()
});




function buildTransaction(transaction){
    let pubKeys= [
      transaction.addressInfo.pubkeys[0],
      transaction.addressInfo.pubkeys[1],
      transaction.addressInfo.pubkeys[2]
    ].map(function (hex) { return Buffer.from(hex, 'hex') })
    var witnessScript = bitcoin.script.multisig.output.encode(3, pubKeys) // 3 of 3
    var redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
    
    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
    for (i = 0; i < (transaction.addressInfo.transactions.length-0); i++){
    txb.addInput(transaction.addressInfo.transactions[i][0],transaction.addressInfo.transactions[i][1],null, scriptPubKey);
    }
    
    txb.addOutput ("mqgSLgUyDSwPG387ePKKXSLMXnWKrxDur5",Decimal(transaction.amountToSend).toNumber());
    if (transaction.advancedOptions && transaction.changeAddress!=""){
      txb.addOutput ("mmC4uVA4nP1EbK1eryxtXQRCkfCXNUhPWh",Decimal(transaction.changeAmount).toNumber());
    }
    };

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
    for (i = 0; i < (transaction.addressInfo.transactions.length-0); i++){
        bitcoinjsTransaction.sign (i, key, redeemScript, null, transaction.addressInfo.transactions[i][2], witnessScript);
        };
    };


$("#startsigs").click(function(){
    $("#confirmTrans").hide();
    $("#profile").show();
    $("#firstsig").addClass("active");
    $("#setup").removeClass("active");
    buildTransaction(createDefaultTrans());
});


//first panel
$("#1stSignaturesubmit").click(function(){
    $("#agreefirst").val("cTFWphyQSKUp9RNEftrXgbgbiTg49wz4wfhrAzmutigyjxUw4DqD")
    let key=$("#agreefirst").val()
    signTransaction(key,transInfo,txb);
    $("#profile").hide();
    $("#2ndpanelstuff").show();
    $("#2ndsig").addClass("active");
    $("#firstsig").removeClass("active");
});

//2nd panel
$("#2ndSignaturesubmit").click(function(){
  if  ($("#showqrcode").is(':visible')!=true){
    $("#showqrcode").show()
  }else{
    $("#agreesecond").val("cQtNm3feFWK5hzR78wUtAowA8pqYDVJsdSVnm4b8qDExEmMvfCNs")
    let key=$("#agreesecond").val()
    signTransaction(key,transInfo,txb);
    $("#2ndpanelstuff").hide();
    $("#3rdpanelstuff").show();
    $("#3rdstuffsign").addClass("active");
    $("#2ndsig").removeClass("active");}
});

//3rd panel
$("#3rdSignaturesubmit").click(function(){
    $("#agreethird").val("cTLCTCWSqoBziY51yHNx1uF2PpEGRZoQHdWsGGpjjmw15YpsFZ9B")
    let key =$("#agreethird").val()
    signTransaction(key,transInfo,txb);//$("#agreethird").val()
    $("#3rdpanelstuff").hide();
    $("#lastpanelstuff").show();
    $("#sendtomempool").addClass("active");
    $("#3rdstuffsign").removeClass("active");
        });


//qrcode stuff


function createqr(transaction){
  var canvas = document.getElementById('canvas')
  let txhex = txb.buildIncomplete().toHex();
  QRCode.toCanvas(canvas, `${transaction.addressInfo.pubkeys},${txhex}`,{ errorCorrectionLevel: 'L' }, function (error) {
    if (error) console.error(error)
    $("#canvas").show()
})}

//show qr code button
$("#showqrcode").click(function(){
  createqr(transInfo)
});

$(".copyTrans").click(function(){
  let txhex = txb.build().toHex();
  copyToClipboard(txhex)

});

function copyToClipboard(hexcode) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(hexcode).select();
  document.execCommand("copy");
  $temp.remove();
}

$(".showQR").click(function(){
  fillDivwithQr()

});

function fillDivwithQr(){
  let canvas = document.getElementById('showLastQrCode')
  let txhex = txb.build().toHex ();
  QRCode.toCanvas(canvas, `${txhex}`,{ errorCorrectionLevel: 'L' }, function (error) {
    if (error) console.error(error)
    $("#showLastQrCode").show()
})}








///end clean code














//update xpub from menmonic
$("#memphraseall").change(function(){
        let xpub;
        xpub=memtopub($("#memphraseall").val());
        $("#createdxpub").val(xpub);
    });
//menmonic to xpub
function memtopub (mem) {
  var seed = bip39.mnemonicToSeed(mem);
  var node = bitcoin.HDNode.fromSeedBuffer(seed);
  var string = node.derivePath("m/44'/0'/0'");
  return string.neutered().toBase58();
};

//Menmonic to xprv
function memtoaccountxprv (mem) {
  var seed = bip39.mnemonicToSeed(mem);
  var node = bitcoin.HDNode.fromSeedBuffer(seed).derivePath("m/44'/0'/0'");

  var string = node.toBase58();
  return string;
};


// btc xprv to adress
function xprvtoadress(xprv,indexofadress){
  var yes = bitcoin.HDNode.fromBase58(xprv);
  var child1 = yes.derivePath(`m/44'/0'/0'/0/${indexofadress}`);
  return child1.getAddress();
};

// btc xprvto privatekey
function xprvtoprivatekey(xprv,indexofadress){
  var yes = bitcoin.HDNode.fromBase58(xprv);
  var child1 = yes.derivePath(`m/44'/0'/0'/0/${indexofadress}`);
  return child1.keyPair.toWIF();
};


// btc xprvto public key
function xprvtopublickey(xprv,indexofadress){
  var yes = bitcoin.HDNode.fromBase58(xprv);
  var child1 = yes.derivePath(`m/44'/0'/0'/0/${indexofadress}`);
  return child1.keyPair.getPublicKeyBuffer().toString('hex');
};




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



});
