/*
This code below will generate the mnemonic keys that will be used for creation and recovery 
The code is written in JQuery 
*/

//imports 
const $ = require("jquery");
const domready = require("domready");
const funcLib = require("./generateFunctions.js")


// Defines variables needed for 12 phrase mnemonic key. 
var choiceArray =[]
var phraseNum=12        // Should you declare variable number initially ( i dont know does that run into magic number?)
var thirdKeyInfo=[]
var memonicStuff

// when Document object model is ready, runs function to:
domready(function () {


$( ".coinPick" ).click(function() {
  $( "#selectCoin" ).fadeOut()
  choiceArray.push(this.id)
  setTimeout(function(){  $("#pdfOrMem").fadeIn() }, 500)
})


//Hanldes the mem gen
$("#genphrase").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    setTimeout(function(){  $("#genJustmem").fadeIn() }, 500)
    memonicStuff=funcLib.genMenmonic(choiceArray[0])
    $(".memphrase").html(memonicStuff[0])
    $(".xpub").html(memonicStuff[1])
    funcLib.addQrCodeToPage('qrmemoniccode',memonicStuff[0])
    funcLib.addQrCodeToPage('canvas',memonicStuff[1])
})
  
 //
$("#genpPDF").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    setTimeout(function(){  $("#generatepdf").fadeIn() }, 500)
    thirdKeyInfo=funcLib.genMenmonic(choiceArray[0])
})

  //
$("#generateMempdf").click(function() {
    funcLib.genmemPDF(memonicStuff)
})

  //
$("#makeMultiSigPdf").click(function() {
  $(this).attr("disabled","disabled")
  let numberOfAdresses=$('#numOfAdresses').val()
  let pubKeyArray=[$('#1stXpub').val(),$('#2ndXpub').val(),thirdKeyInfo[1]]
  let multiSigAdress=funcLib.createAddressArray(pubKeyArray,numberOfAdresses,choiceArray[0])
  funcLib.createPDF(multiSigAdress,thirdKeyInfo[0],pubKeyArray)
  $(this).removeAttr("disabled");   
})



});






