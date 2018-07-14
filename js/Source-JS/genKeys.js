
const $ = require("jquery");
const domready = require("domready");
const funcLib = require("./generateFunctions.js")



var choiceArray =[]
var phraseNum=12
var thirdKeyInfo=[]


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
    let memonicStuff=funcLib.genMenmonic(choiceArray[0])
    $(".memphrase").html(memonicStuff[0])
    $(".xpub").html(memonicStuff[1])
    funcLib.addQrCodeToPage('qrmemoniccode',memonicStuff[0])
    funcLib.addQrCodeToPage('canvas',memonicStuff[1])
})

$("#genpPDF").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    setTimeout(function(){  $("#generatepdf").fadeIn() }, 500)
    thirdKeyInfo=funcLib.genMenmonic(choiceArray[0])
})

$("#makeMultiSigPdf").click(function() {
  $(this).attr("disabled","disabled")
  let numberOfAdresses=$('#numOfAdresses').val()
  let pubKeyArray=[$('#1stXpub').val(),$('#2ndXpub').val(),thirdKeyInfo[1]]
  let multiSigAdress=funcLib.createAddressArray(pubKeyArray,numberOfAdresses,choiceArray[0])
  funcLib.createPDF(multiSigAdress,thirdKeyInfo[0],pubKeyArray)
  $(this).removeAttr("disabled");   
})



});






