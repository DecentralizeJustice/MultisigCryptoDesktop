"use strict";

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

//slider
var keyboardSlider = document.getElementById('keyboard');

setupFeeInfo(transInfo).then(newtrans => transInfo=newtrans)

async function setupFeeInfo(trans){
  let transstuff =   await cust.getFeeInfo(trans)
  cust.setupTooltips(transstuff.recommendFees)
  cust.setUpSlider(transstuff.recommendFees,keyboardSlider)
  return transstuff
}


//tooltips
jQuery('[data-toggle="tooltip"]').tooltip();
$("#setup").addClass("active");
$("#showadvancedoptions").hide();


$("#Bitcoin").click(function() {
  $("#firstq").hide();
  $("#Singleinfo").show();
});

$("#gotoadressinfo").click(function(){
  $("#gooffline").hide();
  $("#setuptrans").show();
});


$(".submitadressinfo1").click(function() {
    $(".submitadressinfo1").hide();
    $("#loader").show();
     //testing
    $("#0pubkey").val("xpub6F1EavjrmsGdDNs7kcXVXc2CdDb3rkFNvgV3M5LJrQBvJ247MP1KuAVwmXwLFRDxeeHBz1cfayt74nvs2rvDUtd7EpdS14sPEaWbmHbMK7n")
    $("#1pubkey").val("xpub6FF1XH67SZunxrHbAd3dyu8mcoAXHoFF1QwXmapmw6kTdxTwpA8AFAJTvFQJdXiQ6T3TdnGPXi68XDW8bKJLFDWPyTNtWeLfs4bA9LV5Pz7")
    $("#2pubkey").val("xpub6DdfJh1xDfVpgtCohdudi4k7ce9FW9A2N9HTLFe3XzHMZdQ5Y5rVXpEPJUhNZNdYUacwiXmrdFAjveXNVNmV5MUupPYtYrMcbg8pQNDLLtU")


    //let xpubKeyString=$("#0pubkey").val()
    let xpubKeyString=[$("#0pubkey").val(),$("#1pubkey").val(),$("#2pubkey").val()]
    cust.getAddressInfo(transInfo,xpubKeyString,parseInt($("#index").val()))
});



$("#changeAmountDiv").click(function(){
  cust.lockWrapper(this)
});

$("#sendAmountDiv").click(function(){
  cust.lockWrapper(this)
});


//feebuttons 
$("#settomidfee").click(function(){
  keyboardSlider.noUiSlider.set(transInfo.recommendFees.midfee);
  cust.sliderChangeManual(transInfo);
});

$("#settolowfee").click(function(){
  keyboardSlider.noUiSlider.set(transInfo.recommendFees.lowfee);
  cust.sliderChangeManual(transInfo);
});

$("#settohighfee").click(function(){
  keyboardSlider.noUiSlider.set(transInfo.recommendFees.highfee);
  cust.sliderChangeManual(transInfo);
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
    updateverything(transInfo);}
  else{
   $("#amount").val(satoshiToBtc(transInfo.amountToSend)); 
  };
});


$("#changeadress").change(function(){
  let proposed=Object.assign({}, transInfo);
  if($("#changeadress").val()!=""){
    proposed.changeAddress=$("#changeadress").val();

    if (transInfo.changeAddress==""){
    cust.byteup(proposed,transInfo);
    }
    else{bytsame(proposed)};

  }else{
      proposed.byteSize=Decimal(cust.getByteCountWrapper(proposed.addressInfo.numInputs,1))
      proposed.changeAddress="";
      proposed.changeAmount=Decimal(0);
      proposed.amountToSend=Decimal(proposed.addressInfo.balance).minus(Decimal(proposed.changeAmount)).minus(Decimal(proposed.feeAmount));
      cust.bytdown(proposed,transInfo);
  };
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

$("#goToConfirmTrans").click(function(){
    if (!(transInfo.advancedOptions)){
      cust.confirmSimpleTrans(cust.createDefaultTrans(transInfo))
      }else{
      if (transInfo.changeAddress==""){
        cust.confirmSimpleTrans(transInfo)
      }else{cust.confirmDoubleTrans(transInfo)}}
    $("#setuptrans").hide()
    $("#confirmTrans").show()

});

$("#editTransaction").click(function(){
    $("#doubleTrans").hide()
    $("#singleTrans").hide()
    $("#confirmTrans").hide()
    $("#setuptrans").show()
});


$("#startsigs").click(function(){
    $("#confirmTrans").hide();
    $("#profile").show();
    $("#firstsig").addClass("active");
    $("#setup").removeClass("active");
    cust.buildTransaction(cust.createDefaultTrans(transInfo),txb);
});


//first panel
$("#1stSignaturesubmit").click(function(){
    $("#agreefirst").val("cTFWphyQSKUp9RNEftrXgbgbiTg49wz4wfhrAzmutigyjxUw4DqD")
    let key=$("#agreefirst").val()
    cust.signTransaction(key,transInfo,txb);
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
    cust.signTransaction(key,transInfo,txb);
    $("#2ndpanelstuff").hide();
    $("#3rdpanelstuff").show();
    $("#3rdstuffsign").addClass("active");
    $("#2ndsig").removeClass("active");}
});

//3rd panel
$("#3rdSignaturesubmit").click(function(){
    $("#agreethird").val("cTLCTCWSqoBziY51yHNx1uF2PpEGRZoQHdWsGGpjjmw15YpsFZ9B")
    let key =$("#agreethird").val()
    cust.signTransaction(key,transInfo,txb);//$("#agreethird").val()
    $("#3rdpanelstuff").hide();
    $("#lastpanelstuff").show();
    $("#sendtomempool").addClass("active");
    $("#3rdstuffsign").removeClass("active");
        });

//qrcode stuff



//show qr code button
$("#showqrcode").click(function(){
  cust.createqr(transInfo,txb)
});

$(".copyTrans").click(function(){
  let txhex = txb.build().toHex();
  cust.copyToClipboard(txhex)
});

$(".showQR").click(function(){
  cust.fillDivwithQr(txb)
});

});
