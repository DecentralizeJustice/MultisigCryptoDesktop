const $ = require("jquery")
const QrCode = require('qrcode-reader');
$(document).ready(function(){

function useCamera(){
  $("#methodselection").hide();
  $("#camerawindow").show();
  
  var scanner = new Instascan.Scanner({ video: document.getElementById('preview'),backgroundScan: false,scanPeriod: 3 });
      scanner.addListener('scan', function (content) {
        divtoaddtextto.val(content)
        scanner.stop();
        $("#qrcodereaderror").addClass("d-none");
        $("#qrcodereaderror").removeClass("d-inline");
        $("#methodselection").show()
        $("#camerawindow").hide()
        jQuery('#ModalCenter').modal('hide');
      });

      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          if(cameras[1]){scanner.start(cameras[1]).catch((err) => {
            console.log("Camera Not Allowed")
            jQuery('#ModalCenter').modal('hide');
          })} 
          else {scanner.start(cameras[0]).catch((err) => {
            console.log("Camera Not Allowed")
            jQuery('#ModalCenter').modal('hide');
          })}
        } 
          else {
            console.log('No cameras found.');
          }})
            .catch(function (e) {
              console.log(e);
            });

jQuery('#ModalCenter').on('hidden.bs.modal', function () {
    scanner.stop();
});};


$(".qr").click(function() {
  store(this);
});

$(".usecamera").click(function() {
  useCamera()
});

$( ".file" ).change(function() {
  openQRCamera(this);
});

let divtoaddtextto

function store(stuff){
  divtoaddtextto= $(stuff).parent().find(".qrplace")

}

jQuery('#ModalCenter').on('hidden.bs.modal', function () {
  $("#qrcodereaderror").addClass("d-none");
  $("#qrcodereaderror").removeClass("d-inline");
  $("#methodselection").show();
  $("#camerawindow").hide();
});


function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function() {
  var qr = new QrCode();
  qr.callback = function(error, results) {
      if(error) {
        $("#qrcodereaderror").addClass("d-inline")
      }
       divtoaddtextto.val(results.result)
       jQuery('#ModalCenter').modal('hide');
    }
    qr.decode(reader.result);
  }
  reader.readAsDataURL(node.files[0]);
}

})