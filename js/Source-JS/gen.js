

//Random number gen library 
var secureRandom= require('secure-random');
var BigInteger = require('bigi');
//bip39 npm
var bip39 = require('bip39');
var $ = require("jquery");
var domready = require("domready");
var bitcoin = require('bitcoinjs-lib')
var QRCode = require('qrcode')



//Random Numbers from https://www.npmjs.com/package/secure-random
function rng () { return secureRandom(32, {type: 'Buffer'}) }



domready(function () {

//gen memonic phrases
function genstuff(){
let numMap = new Map();
numMap.set(12, 16);numMap.set(15, 20);numMap.set(18, 24);
numMap.set(21, 28);numMap.set(24, 32);
length=numMap.get(phrasenumbarray[0]);
var mnemonic = bip39.entropyToMnemonic(secureRandom(length, {type: 'Array'}));



var seed = bip39.mnemonicToSeed(mnemonic);
var node = bitcoin.HDNode.fromSeedBuffer(seed);
//var xpubString = node.neutered().toBase58();
var path = "m/44'/0'/0'/0";

child1 = node.derivePath(path).neutered().toBase58()

return [mnemonic,child1];}

$("#stufff").hide();
//Hanldes the mem gen
  $(".genphrase").click(function() {
  //console.log(bip39.generateMnemonic());
  var stuff=genstuff();
  $(".memphrase").html(stuff[0]);
  $(".xpub").html(stuff[1]);
  $("#stufff").show();
  QRCode.toCanvas(document.getElementById('canvas'), stuff[1],{ errorCorrectionLevel: 'L' }, function (error) {
    if (error) console.error(error)
  })
});

//use array and .phr function to update phrase lenght
var phrasenumbarray=[12];
  $(".phr").click(function() {
  var id=$(this).attr("id");
  var num =parseInt(id.replace("phr", ""));
  $(`#phr`+phrasenumbarray[0]).removeClass("btn-success");
  $(`#phr`+phrasenumbarray[0]).addClass("btn-dark");
  phrasenumbarray[0]=num;
  $(`#phr`+phrasenumbarray[0]).removeClass("btn-dark");
  $(`#phr`+phrasenumbarray[0]).addClass("btn-success");
  
});






});


//



