/*get screen size*/
var scry = window.innerHeight;
var scrx = window.innerWidth;
/*set target colours - outer to inner*/
var ringColours = ["#eee", "#eee", "#444", "#444", "#017CC1", "#017CC1", "#B5121A", "#B5121A", "#F9A538", "#F9A538"];
var ringNumber = 10;
/*set up the canvas */
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
document.getElementById("myCanvas").setAttribute("height", scry);
document.getElementById("myCanvas").setAttribute("width", scrx);
/*alert(scrx + " by " + scry);*/

/*draw the inital target*/
function createTarget() {
  for (i = 0; i < ringNumber; i++) {
    radWidth = ((scry / 2) / ringNumber) * (ringNumber - i);
    ctx.beginPath();
    ctx.arc(scrx / 2, scry / 2, radWidth, 0, 2 * Math.PI);
    ctx.strokeStyle = "#222";
    ctx.stroke();
    ctx.fillStyle = ringColours[i];
    ctx.fill();
    /*alert(ringColours[i]+" "+(scry/2)+","+(scrx/2)+" "+radWidth);*/
  }
}
/*draw new target */
function newTarget() {
  var ringNumber = document.getElementById("newRing").value;
  /*alert(ringNumber);*/
  for (i = 0; i < ringNumber; i++) {
    radWidth = ((scry / 2) / ringNumber) * (ringNumber - i);
    ctx.beginPath();
    ctx.arc(scrx / 2, scry / 2, radWidth, 0, 2 * Math.PI);
    ctx.strokeStyle = "#222";
    ctx.stroke();
    ctx.fillStyle = ringColours[i];
    ctx.fill();
  }
}
/*
get each ring size*/
/*check if the ring has ben clicked.*/

/*is the coords of the mouse less than or equal to the ring top left*/
/*if yes, set the score*/

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getCoor(){
var x = event.clientX;
var y = event.clientY;
ctx.beginPath();
ctx.arc(x-10, y-10, 10, 0, 2 * Math.PI);
ctx.fillStyle = "black";
ctx.fill();


pixData = ctx.getImageData(x, y, 1, 1).data;
alert( rgbToHex(pixData[1], pixData[2], pixData[3]) );
}
