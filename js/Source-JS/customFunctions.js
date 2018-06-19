
const noUiSlider = require('nouislider')
const wNumb = require("wnumb")
const bitcoin = require('bitcoinjs-lib')
const Decimal = require('decimal.js')


module.exports = {

	setUpSlider: setUpSlider,
	getFeeInfo: getFeeInfo,
	setupTooltips: setupTooltips,
	makeSureNotNegative: makeSureNotNegative,
	getAddress: getAddress,
	getSingleAddressInfo: getSingleAddressInfo,
	getCORS: getCORS,
	parseAddressData: parseAddressData,
	publickeyToAddress: publickeyToAddress,
	getByteCount: getByteCount,
	getByteCountWrapper:getByteCountWrapper,
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

function getAddress(transInfo){
  //testing
  $("#btcpubkeys").val("029d5ea4ef0bbf9adb9cda8ab2eacd5c440f4e36999582e7484f27fef871011c5f,02bdffd977d271c0a72d2c9e563fdab34d94b7f7f9e69f64ca6cc0378bcbb18fa3,02f5c569bf4fd8ebb861507c238e2c2300c152edc2544d068d83e8ce75411a683e")
  pubkeyArray=($("#btcpubkeys").val()).split(",")    
  transInfo.addressInfo.address=publickeyToAddress(pubkeyArray)
  transInfo.addressInfo.pubkeys= pubkeyArray  
  return transInfo
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

