/*get screen size*/
var scry = window.innerHeight - 150;
var scrx = window.innerWidth - 150;

/*inital score */
var score = 0;
var arrowCount = 0;
var averageScore = 0;

var sessionScore = [];
/*set target colours - outer to inner*/
/*var ringColours = ["#eee", "#eee", "#444", "#444", "#017CC1", "#017CC1", "#B5121A", "#B5121A", "#F9A538", "#F9A538"];*/
var ringColours = [
  ["#ffffff", 1],
  ["#efefef", 2],
  ["#444444", 3],
  ["#454545", 4],
  ["#017cc1", 5],
  ["#017cc2", 6],
  ["#b5121b", 7],
  ["#b5121c", 8],
  ["#f9a538", 9],
  ["#f9a539", 10]
];
var ringNumber = 10;
/*set up the canvas */
var c = document.getElementById("targetLayer");
var ctx = c.getContext("2d");
var c2 = document.getElementById("arrowLayer");
var ctxArr = c2.getContext("2d");
/*ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;*/

document.getElementById("targetLayer").setAttribute("height", scry);
document.getElementById("targetLayer").setAttribute("width", scrx);
document.getElementById("arrowLayer").setAttribute("height", scry);
document.getElementById("arrowLayer").setAttribute("width", scrx);
/*alert(scrx + " by " + scry);*/

/*draw the inital target*/
function createTarget() {
  for (i = 0; i < ringNumber; i++) {
    radWidth = ((scry / 2) / ringNumber) * (ringNumber - i);
    ctx.beginPath();
    ctx.arc(scrx / 2, scry / 2, radWidth, 0, 2 * Math.PI);
    ctx.strokeStyle = "#222222";
    ctx.stroke();
    ctx.fillStyle = ringColours[i][0];
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
    ctx.fillStyle = ringColours[i][0];
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

function addArrow() {
  var x = event.clientX;
  var y = event.clientY;

  /*alert(rgbToHex(pixData[0], pixData[1], pixData[2]));*/
  pixData = ctx.getImageData(x, y - 130, 1, 1).data;
  arrowColour = rgbToHex(pixData[0], pixData[1], pixData[2]);
  /*check if outside target and if so, add 0 to sessionScore array*/
  if (arrowColour == "#000000") {
    sessionScore.push(0);
  }
  /*for each click check the colour under the cursor and assign relevant value from the ringColours array */
  for (i = 0; i < ringNumber; i++) {
    if (arrowColour == ringColours[i][0]) {
      score += ringColours[i][1];
      sessionScore.push(ringColours[i][1]);
      /*alert("hex code: "+rgbToHex(pixData[0], pixData[1], pixData[2])+" current ring colour: "+ringColours[i][0]+" score is now: "+score);*/
    }
  }
  /*draw the hit marker*/
  ctxArr.beginPath();
  ctxArr.arc(x, y - 130, 10, 0, 2 * Math.PI);
  ctxArr.fillStyle = "black";
  ctxArr.fill();
  /*increase the vasious counters*/
  arrowCount++;
  averageScore = Math.round((score / arrowCount) * 100) / 100;
  /* update text on page */
  document.getElementById("scoreBoard").innerHTML = score;
  document.getElementById("quiver").innerHTML = arrowCount;
  document.getElementById("average").innerHTML = averageScore;
  document.getElementById("scoreListText").innerHTML = sessionScore;
}
