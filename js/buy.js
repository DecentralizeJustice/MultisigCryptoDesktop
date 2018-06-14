$(document).ready(function(){



//Initial Display settings
$("#1").hide();
$("#2").hide();
$("#3").hide();
$("#4").hide();
$("#pay").hide();
$("#back").css("visibility", "hidden");



//Globals
//Counter to keep track of current view
var counter=0;
//Keep track of number of adrsses
var numofadresses=50;
//artwork tuple array
var artwork=["images/blank.png","images/blank.png","images/blank.png","images/blank.png","images/blank.png"];

var paystuff=0;


//package buttons value
$("#numberofadresses").val("50")

//Choose Package button
$(".packageButton").click(function(){
   $(".packageButton").hide();
   $(".checkedMark").hide();
   $(this).next().show();
   $(".packageButton").show();
   $(this).hide();
   setnumofAddress($($(this).prev()[0]).attr('id'));
});
function setnumofAddress(id){
  if (id=="premuimPackage")
    {$("#numberofadresses").val("15")}

  if (id=="standardPackage")
    {$("#numberofadresses").val("5")}

  if (id=="basicPackage")
    {$("#numberofadresses").val("2")}

  if (id=="deluxePackage")
    {$("#numberofadresses").val("50")}

  updatenumofadress();
};


//Bottom Buttons
//Hanldes the Next button 
$("#next").click(function(){
  $('#bottom-buttons').css('margin-top', '5%');
  $("#back").css("visibility", "visible");
    if (counter!=4){
      $("#"+counter+"").hide();
      $("#"+(counter+1)+"").fadeIn();
      ++counter;}
    if (counter==4){

      $("#next").css("visibility", "hidden");
      finalArt();
      }
  updateprogress("->")
  updateCartDomLen()
});
//Handles the back button 
$("#back").click(function(){
  paystuff=0
  $("#next").css("visibility", "visible");
    if (counter!=0){
      $("#"+counter+"").hide();
      $("#"+(counter-1)+"").fadeIn();
      updateprogress("<-") ;
      --counter;}
    if (counter==0){
      $("#back").css("visibility", "hidden");
      }
});
//Handles the submit button 
$("#submit").click(function(){

  $('#bottom-buttons').css('margin-top', '5%');
  $("#back").css("visibility", "visible");
    //Final option
    if (counter==5){}
    if (counter!=4){
      $("#"+counter+"").hide();
      $("#"+(counter+1)+"").fadeIn();
      ++counter;}
    if (counter==4){
      if (paystuff==1){
              paymentmethod();   
      }else{paystuff=1}
      $("#next").css("visibility", "hidden");
      getFormData();
      finalArt();
      };
  updateprogress("->")
  updateCartDomLen()

});

function getFormData(){
  $("#artworkSummary").empty()
  pubkey=$("#key").val()
 //artList=getCartContents()
  contactJson=getContactInfo()

  finalshipInfo(contactJson)
 //updatePackage(getCartContents())
 //updateCartArtWork(artList)
}

  function updatePackage(list){
    if (list.length==5){
      $("#package").text("Standard")
    }
    if (list.length==2){
      $("#package").text("Starter")
    }
    if (list.length==10){
      $("#package").text("Premuim")
    }
  }

function getContactInfo(){
  var contactInfo = new Map();

  if ($("#email").val()!=""){
    contactInfo.set("email",$("#email").val())}

  if ($("#full_name_id").val()!=""){
     contactInfo.set("name", $("#full_name_id").val()); }

  if ($("#street1_id").val()!=""){
    contactInfo.set("street1", $("#street1_id").val())}

  if ($("#street2_id").val()!=""){
    contactInfo.set("street2",$("#street2_id").val())}

  if ($("#city_id").val()!=""){
    contactInfo.set("city",$("#city_id").val())}

  if ($("#zip_id").val()!=""){
    contactInfo.set("zipCode",$("#zip_id").val())}

  if ($("#country").val()!=""){
    contactInfo.set("country",$("#country").val())}

  return contactInfo
}

function updateCartArtWork(artList){


  for (var i = 0 ; i <= artList.length-1; i++) {
    if (artList[i]!="images/blank.png"){
      art=artList[i]
      let phrase1=`<div class="col-4 justify-content-center"><img src=images/`+art+`  class="img-thumbnail col-12" style="margin-top: 10%;"></div>`;
      $( "#artworkSummary" ).append(phrase1);}
 }

}



//handle the progress bar by looking at counter
function updateprogress(direction){
  if(direction=="->"){
    $("#theprogressbar").children().eq(counter)
    .addClass("bg-success")
    //.addClass("progress-bar-animated")
    .addClass("progress-bar-striped")
    .removeClass("bg-dark")
  }
  else{
    $("#theprogressbar").children().eq(counter)
    .removeClass("bg-success")
    //.removeClass("progress-bar-animated")
    .removeClass("progress-bar-striped")
    .addClass("bg-dark")
  };
};

function updatenumofadress(){
  numofadresses=parseInt($('#numberofadresses').val());
};

function correctNumofPics(){
  if ($('#numberofadresses').val()== 50){
    return 5
  }
  if ($('#numberofadresses').val()== 2){
    return 2
  }
  if ($('#numberofadresses').val()== 5){
    return 5
  }
  if ($('#numberofadresses').val()== 15){
    return 5
  }
}

function updateCartDomLen(){
 let numofDomObjects=$("#carts").children().length;

  if (numofDomObjects>correctNumofPics()){
    $("#carts").children()[4].remove()
    $("#carts").children()[3].remove()
    $("#carts").children()[2].remove()
    decreaseArtLenght() 
  }
  if (numofDomObjects<correctNumofPics()){
    let thingtoAppend= `<div class="card w-25 m-2 h-100" style="">\
    <div class="card-body">\
    <img class="card-img-top" src="images/blank.png" alt="Card image cap">\
    </div>\
    </div>`
    $("#carts").append(thingtoAppend)
    $("#carts").append(thingtoAppend)
    $("#carts").append(thingtoAppend)
    increaseArtLenght()
  }


};
 function increaseArtLenght(){
   for (let i = 0; i < 3; i++){artwork.push("images/blank.png")}
  }

 function decreaseArtLenght(){
  artwork.length -= 3;
 }
 
 function addtoartarray(artSource){
  let emptyPlace=artwork.length-1
  let foundempty=false;
  for (let i = 0; i < artwork.length; i++){
    if (artwork[i]=="images/blank.png"){
      emptyPlace=i;
      foundempty=true;
      break
    }}

    if (!(foundempty)){
      artwork.unshift(artSource)
      artwork.splice(-1,1)
    }else{
    artwork[emptyPlace]=artSource}

 }


//hanldes the add to cart funtions
$( ".addtocart" ).click(function() {
  addtocartfunction(this);
});


function addtocartfunction(art) {
  let artToAdd=$(art).parent().children("a").attr('href');
  addtoartarray(artToAdd)
  updateCartDomContents()
};


function updateCartDomContents(){

for (let i = 0; i < artwork.length; i++){

    if (artwork[i]!="images/blank.png"){
      let img=artwork[i]
      $("#carts").children().eq(i).children().children("img").attr('src',img)  

      if($("#carts").children().eq(i).children().has("button").length==0){
        $("#carts").children().eq(i).children().append(`<button type="button" class="btn btn-danger removefromcart" style="margin-top: 5%;">Remove</button>`)}
    }else{
      $("#carts").children().eq(i).children().children("img").attr('src',"images/blank.png")

      if($("#carts").children().eq(i).children().has("button").length==1){
        $("#carts").children().eq(i).children().children("button").remove()}
    }}}

//handles the remove button
$( document ).on( "click",".removefromcart",removecartfunction );
  function removecartfunction() {
    artwork[$(this).parent().parent().index()]="images/blank.png";
    updateCartDomContents()
    //$(this).parent().children()[1].remove();  
  };

function finalArt (){
  $("#artworkSummary").empty()

  for (var i = 0; i < artwork.length; i++) {
    if (artwork[i]!="images/blank.png"){
      $("#artworkSummary").append(`<div class="card m-2 col-3" style="">
  <div class="card-body">
  <img class="card-img-top" src="${artwork[i]}" >
  </div>
  </div>`)
    }
  }

  if ($("#artworkSummary").is(':empty')){
    $("#artworkTitle").hide()
  }else{$("#artworkTitle").show()}

}

function finalshipInfo (myMap){
  $("#shippingSummary").empty()

  if (myMap.get("email")==undefined){
    $("#emailStuff").html(` <p class="text-danger"> Missing Email<p>`)
  }else{
  $("#emailStuff").html(`${myMap.get("email")}`)}


 if (myMap.get("name")!=undefined){
    $("#shippingSummary").append(`${myMap.get("name")}<br>`)
  }

  if (myMap.get("street1")==undefined){
    $("#shippingSummary").append(`<p class="text-danger"> Missing Street Info<p><br>`) 
  }else{
    $("#shippingSummary").append(`${myMap.get("street1")}<br>`)
  }

  if (myMap.get("street2")!=undefined){
    $("#shippingSummary").append(`${myMap.get("street2")}<br>`) 
  }

  if (myMap.get("city")==undefined){
    $("#shippingSummary").append(`<p class="text-danger"> Missing City Info<p><br>`) 
  }else{
    $("#shippingSummary").append(`${myMap.get("city")}<br>`)
  }
  if (myMap.get("zipCode")==undefined){
    $("#shippingSummary").append(`<p class="text-danger"> Missing Zip Code Info<p><br>`) 
  }else{
    $("#shippingSummary").append(`${myMap.get("zipCode")}<br>`)
  }
  if (myMap.get("country")!=undefined){
    $("#shippingSummary").append(`${myMap.get("country")}<br>`) 
  }


  if ($("#key").val()==""){
    $("#xpubStuff").html(` <p class="text-danger"> Missing Extended Key<p>`)
  }else{
  $("#xpubStuff").html($("#key").val())}
}

$("#editKey").click(function(){
  editPast(0)
})

$("#editEmail").click(function(){
  editPast(3)
})

$("#editAddress").click(function(){
  editPast(3)
})

function editPast(divToShow){
  $("#4").hide()
  paystuff=0
  $(`#${divToShow}`).show() 
  for (var i = 4; i >= divToShow+1; i--) {
    $("#theprogressbar").children().eq(i)
    .removeClass("bg-success")
    .removeClass("progress-bar-animated")
    .removeClass("progress-bar-striped")
    .addClass("bg-dark")
  }
  if (divToShow==0){
      $("#back").css("visibility", "hidden");
      }
  $("#next").css("visibility", "visible");
  counter=divToShow


}

function paymentmethod(){
  
  $("#bottom-buttons").css("visibility", "hidden");
  $("#back").css("display", "none");
  $("#theprogressbar").css("visibility", "hidden");
  $("#theprogressbar").remove();
  $("#bottom-buttons").remove()
  $("#4").css("display", "none");

  $("#pay").show();
  
}

});
  
