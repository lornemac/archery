/*initalise variables for scoring and end tracking */
var score = 0;
var arrowCount = 0;
var averageScore = 0;
var end = 0;
var endArrowCount = 1;
var sessionScore = [
  []
];
/*set target colours - outer to inner*/
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

var endColours = ["#669f4f", "#854040", "#5f7ba6", "#7d8047", "#9a5b92", "#d735a0", "#254736", "#b46a14", "#aed124", "#3a3a53"];
var icol = 0;
var currEndColour = endColours[icol];
var xcoords = [];
var ycoords = [];
var ringNumber = 10;
/*set up the canvas */
var c = document.getElementById("targetLayer");
var ctx = c.getContext("2d");
var c2 = document.getElementById("arrowLayer");
var ctxArr = c2.getContext("2d");
/*ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;*/

document.getElementById("targetLayer").width = window.innerWidth;
document.getElementById("targetLayer").height = window.innerHeight;
document.getElementById("arrowLayer").width = window.innerWidth;
document.getElementById("arrowLayer").height = window.innerHeight;
/*alert("window size: "+window.innerWidth+" by "+window.innerHeight+"canvas size: "+document.getElementById("targetLayer").width +" by "+document.getElementById("targetLayer").height)*/

/*get canvas size*/
var scry = document.getElementById("targetLayer").height - 150;
var scrx = document.getElementById("targetLayer").width - 150;
/*
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

/*convert the rgba values to hex */

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/*add an arrow to the target */

function addArrow() {
  arrowCount++;
  /*get arrow x,y location and store it into arrays */
  var x = event.clientX;
  var y = event.clientY;

  /*get the colour under the cursor*/
  pixData = ctx.getImageData(x, y - 130, 1, 1).data;
  /*convert it to hex*/
  arrowColour = rgbToHex(pixData[0], pixData[1], pixData[2]);
  /*check if outside target and if so, add 0 to sessionScore array and add coordinates to x,y arrays*/
  if (arrowColour == "#000000") {
    sessionScore[0].push(0);
    xcoords.push(x);
    ycoords.push(y);
  }
  /*for each click check the colour under the cursor and assign relevant value from the ringColours array */
  for (i = 0; i < ringNumber; i++) {
    if (arrowColour == ringColours[i][0]) {
      score += ringColours[i][1];
      /*store score in array*/
      sessionScore[0].push(ringColours[i][1]);
      /*store coords in 2 arrays..  this should prob be an object!*/
      xcoords.push(x);
      ycoords.push(y);
    }
  }
  /*draw the hit marker on a new canvas so that there can be overlapping arrows*/
  ctxArr.beginPath();
  ctxArr.strokeStyle = '#1bd15b';
  ctxArr.arc(x, y - 130, 10, 0, 2 * Math.PI);
  ctxArr.fillStyle = currEndColour;
  ctxArr.lineWidth=5;
  ctxArr.stroke();
  ctxArr.fill();
  /*increase the various counters*/
  if (endArrowCount < 3) {
    endArrowCount++;
  } else {
    endArrowCount = 1;
    end++;
    icol++;
  }
  currEndColour = endColours[icol];


  /*alert("arrow number: "+arrowCount+" end number: "+end);*/
  averageScore = Math.round((score / arrowCount) * 100) / 100;
  /* update text on page */
  document.getElementById("scoreBoard").innerHTML = score;
  document.getElementById("quiver").innerHTML = arrowCount;
  document.getElementById("average").innerHTML = averageScore;
  document.getElementById("scoreListText").innerHTML = sessionScore;
  document.getElementById("currentEnd").innerHTML = end+1;
  if (arrowCount == 30 && end == 10) {
    alert("end of round!  your total score was: " + score);
  }
}

function shootLines() {
  for (var i = 0; i < xcoords.length; i++) {
    ctxArr.beginPath();
    ctxArr.moveTo(xcoords[i], ycoords[i] - 130);
    ctxArr.lineTo(xcoords[i + 1], ycoords[i + 1] - 130);
    ctxArr.strokeStyle = '#1bd15b';
    ctxArr.stroke();
  }
}

/* trying to set a delay in drawing each line */
/*
function shootLines() {
  for (var i = 0; i < xcoords.length; i++) {
    drawLines(i);
  }
}

function drawLines(j) {
  setTimeout(function(j) {
    ctxArr.beginPath();
    ctxArr.moveTo(xcoords[j], ycoords[j] - 130);
    ctxArr.lineTo(xcoords[j + 1], ycoords[j + 1] - 130);
    ctxArr.strokeStyle = '#1bd15b';
    ctxArr.stroke();
  }, 1000);
}*/
