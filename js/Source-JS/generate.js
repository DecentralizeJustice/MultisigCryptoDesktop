

const BigInteger = require('bigi');
const bip39 = require('bip39');
const $ = require("jquery");
const domready = require("domready");
const bitcoin = require('bitcoinjs-lib')
const QRCode = require('qrcode')
const funcLib = require("./generateFunctions.js")
const jsPDF = require('jspdf')




var choiceArray =[]
var phraseNum=12;


domready(function () {


$( ".coinPick" ).click(function() {
  $( "#selectCoin" ).fadeOut()
  choiceArray.push(this.id)
  setTimeout(function(){  $("#pdfOrMem").fadeIn() }, 500)
})


//use array and .phr function to update phrase lenght
  $(".phrButton").click(function() {
      let id=$(this).attr("id");
      let num =parseInt(id.replace("phr", ""));
      $(`#phr`+phraseNum).removeClass("btn-success");
      $(`#phr`+phraseNum).addClass("btn-dark");
      phraseNum=num;
      $(`#phr`+phraseNum).removeClass("btn-dark");
      $(`#phr`+phraseNum).addClass("btn-success");
  });

//Hanldes the mem gen
$("#genphrase").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    setTimeout(function(){  $("#genJustmem").fadeIn() }, 500)
    let memonicStuff=funcLib.genMenmonic(phraseNum,choiceArray[0]);
    $(".memphrase").html(memonicStuff[0]);
    $(".xpub").html(memonicStuff[1]);
    QRCode.toCanvas(document.getElementById('canvas'), 
      memonicStuff[1],{ errorCorrectionLevel: 'L' }, function (error) {
      if (error) console.error(error)
    })
})

$("#genpPDF").click(function() {
    $( "#pdfOrMem" ).fadeOut()
    //setTimeout(function(){  $("#genJustmem").fadeIn() }, 500)

})



});






