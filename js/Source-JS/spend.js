"use strict";

const $ = require("jquery")
const bitcoin = require('bitcoinjs-lib')
const request = require('request')
const QRCode = require('qrcode')
const noUiSlider = require('nouislider')
const Decimal = require('decimal.js')
const wNumb = require("wnumb")
const cust = require("./spendFunctions.js");


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
  mainReceivingAddress:""
};


//trsaction global for bitcoin js
var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);

//slider
var keyboardSlider = document.getElementById('keyboard');

setupFeeInfo(transInfo).then(newtrans => transInfo=newtrans)

async function setupFeeInfo(trans){
  let transstuff =   await cust.getFeeInfo(trans)
  cust.setupTooltips(transstuff.recommendFees)
  cust.setUpSlider(transstuff.recommendFees,keyboardSlider,transstuff)
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
    //testMat
    $("#0pubkey").val("tpubDEPTmYGgemYDi5SuR5WzQwJ8c32hgyMMyNFiaaxrYKsQqUbvnmDpyr5wdAdhGRM897t11uTTRADq5DYNuWCGRgM2WjMTru3JaswZ7cbWMgy")
    $("#1pubkey").val("tpubDEUHJXyEWLe2wjYsYSCRHJBEQ2mJsAiWSXouJjiiYMQvNTJiHEEFp42x3ptDjChdoahWRReLKrHuYUQujDkX8fZpMKhbwXnJqLdp2QD4Ld6")
    $("#2pubkey").val("tpubDFCVdDeWPAm574otuz2YPkyGQDff5GaN1R6X6NwUVTuECiUJKaQqvSc4DdhgY3PufeiBvaVf5qHEdzqZA4uitKx7JBGwFcABumtw8PRyXgx")
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
  //testmat
  $("#adresssend").val("2MwdNvHB7gronsTXzeRZhorQ6KcVLV3C6R3")
  transInfo.mainReceivingAddress=$("#adresssend").val()
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

    let key=cust.getKeyFromDom($("#memphrasesingle").val(),$("#agreefirst").val())
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

    let key=cust.getKeyFromDom($("#memphrase2nd").val(),$("#agreesecond").val())
    cust.signTransaction(key,transInfo,txb);
    $("#2ndpanelstuff").hide();
    $("#3rdpanelstuff").show();
    $("#3rdstuffsign").addClass("active");
    $("#2ndsig").removeClass("active");}
});

//3rd panel
$("#3rdSignaturesubmit").click(function(){

    let key=cust.getKeyFromDom($("#memphrase3rd").val(),$("#agreethird").val())
    cust.signTransaction(key,transInfo,txb);
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
