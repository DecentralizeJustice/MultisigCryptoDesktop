const $ = require("jquery")

$(document).ready(function(){

function useCamera(){
  $("#methodselection").hide();
  $("#camerawindow").show();
  
  var scanner = new Instascan.Scanner({ video: document.getElementById('preview'),backgroundScan: false,scanPeriod: 3 });
      scanner.addListener('scan', function (content) {
        divtoaddtextto.value=content;
        scanner.stop();
        $("#qrcodereaderror").addClass("d-none");
        $("#qrcodereaderror").removeClass("d-inline");
        $("#methodselection").show()
        $("#camerawindow").hide()
        jQuery('#ModalCenter').modal('hide');
      });

      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]).catch((err) => {
            console.log("Camera Not Allowed")
            jQuery('#ModalCenter').modal('hide');
          })} 
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
  log(this);
});

$(".usecamera").click(function() {
  useCamera()
});

$( ".file" ).change(function() {
  openQRCamera(this);
});

let divtoaddtextto

function log(stuff){
  divtoaddtextto= $(stuff).parent().find(".form-control")[0];
};

jQuery('#ModalCenter').on('hidden.bs.modal', function () {
  $("#qrcodereaderror").addClass("d-none");
  $("#qrcodereaderror").removeClass("d-inline");
  $("#methodselection").show();
  $("#camerawindow").hide();
});


function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function() {
  qrcode.callback = function(res) {
      if(res=="error decoding QR Code") {
        $("#qrcodereaderror").addClass("d-inline");
      } else {
       divtoaddtextto.value=res;
         jQuery('#ModalCenter').modal('hide');
      };  
    };
    qrcode.decode(reader.result);
  };
  reader.readAsDataURL(node.files[0]);
};

})