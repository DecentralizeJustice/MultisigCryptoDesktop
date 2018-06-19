
const $ = require("jquery")
const bitcoin = require('bitcoinjs-lib')
const request = require('request')
const QRCode = require('qrcode')
const noUiSlider = require('nouislider')
const Decimal = require('decimal.js')
const wNumb = require("wnumb")
const cust = require("./customFunctions.js");

$( document ).ready(function() {


//transacton  global object
let transInfo= {
  changeAddress:"",
  changeAmount:Decimal(0),
  recommendFees:{},
  addressInfo:{},
  amountToSend:0,
  feeAmount:0,
  advancedOptions:false,
};


//trsaction global for bitcoin js
let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);




//slider
let keyboardSlider = document.getElementById('keyboard');

setupFeeInfo(transInfo).then(newtrans => transInfo=newtrans); 



async function setupFeeInfo(trans){
  let transstuff =   await cust.getFeeInfo(trans)
  cust.setupTooltips(transstuff.recommendFees)
  cust.setUpSlider(transstuff.recommendFees,keyboardSlider)
  return transstuff
}

async function getAddressInfo(){

 transInfo=await cust.getAddress(transInfo); 
 let stuff=await cust.getSingleAddressInfo(transInfo.addressInfo.address)
 await cust.parseAddressData(stuff,transInfo)
 setuptransInfo() 
}





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
    getAddressInfo()
});







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











});
