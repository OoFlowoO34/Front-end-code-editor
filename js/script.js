/* 
To be added  =>
------ Store cursor selection ------

  var myElement = document.getElementById('text-box');
  var = myElement.selectionStart;
  var endPosition = myElement.selectionEnd;
  

  const input = document.getElementById('text-box');
  input.focus();

  input.setSelectionRange(startPosition,tartPosition);
  console.log(startPosition );
  
*/

let getCodeAreaHtml = document.getElementById("codeareaHtml");
let getResulthtml = document.getElementById("resulthtml");

let getCodeAreaCss = document.getElementById("codeareaCss");
let qryStyle = document.querySelector("style");

let getCodeAreaJs = document.getElementById("codeareaJs");
let qryScript = document.querySelector(".classScript");

let dataHtml = sessionStorage.getItem("htmlStored");
let dataCss = sessionStorage.getItem("cssStored");
let dataJs = sessionStorage.getItem("jsStored");

let dataAutofocus = sessionStorage.getItem("autofocus");
console.log("onload");
if (dataAutofocus == "html") {
  getCodeAreaHtml.focus();
  console.log("if html");
}
if (dataAutofocus == "css") {
  getCodeAreaCss.focus();
  console.log("if css");
}
if (dataAutofocus == "js") {
  getCodeAreaJs.focus();
  console.log("if js");
}

let convertDataHtml = JSON.parse(dataHtml);
getCodeAreaHtml.value = convertDataHtml;
getResulthtml.innerHTML = convertDataHtml;

let convertDataCss = JSON.parse(dataCss);
getCodeAreaCss.value = convertDataCss;
qryStyle.innerHTML = convertDataCss;
console.log("DataJs= " + dataJs);
let convertDataJs = JSON.parse(dataJs);
console.log("convertDataJs= " + dataJs);
getCodeAreaJs.value = convertDataJs;
qryScript.innerHTML = convertDataJs;

console.log(dataHtml);

const autofocus = "autofocus";

//Get and show maxlength value on refresh
let getAttMaxLength = getCodeAreaHtml.getAttribute("maxlength");
let getShowMaxLength = document.getElementById("showmaxlength");
getShowMaxLength.innerHTML = getAttMaxLength;

let currentMaxLength = parseInt(getAttMaxLength);
console.log("currentMaxLength= " + currentMaxLength);

/* -- Add HTML -- */

getCodeAreaHtml.addEventListener("keyup", addhtml);
function addhtml() {
  let getCodeAreaValuehtml = getCodeAreaHtml.value;
  let CodeArealenghtHtml = getCodeAreaHtml.value.length;
  let CodeArealenghtHtmlFree = getCodeAreaHtml.value.replace(
    /(<([^>]+)>)/gi,
    ""
  ).length;

  console.log(getCodeAreaValuehtml);

  let getLenghthtml = document.getElementById("lenghthtml");
  let getAttMaxLength = getCodeAreaHtml.getAttribute("maxlength");
  let lengthPercent = (CodeArealenghtHtmlFree * 100) / currentMaxLength;
  console.log("free= " + CodeArealenghtHtmlFree);
  console.log("HTML= " + CodeArealenghtHtml);
  let lengthDiff = CodeArealenghtHtml - CodeArealenghtHtmlFree;
  console.log("Diff= " + lengthDiff);
  let intAttMaxLength = parseInt(getAttMaxLength);
  console.log("intAttMaxLength= " + intAttMaxLength);
  let addLengthDiff = currentMaxLength + lengthDiff;

  console.log("DiffAdded= " + addLengthDiff);

  getCodeAreaHtml.setAttribute("maxlength", addLengthDiff);

  //progress Bar
  let getProgressColor = document.getElementById("progressColor");
  getProgressColor.style.width = `${lengthPercent}%`;

  console.log("ProgressBar= " + lengthPercent + "%");
  if (lengthPercent >= 50) {
    getLenghthtml.style.color = "orange";
    getProgressColor.style.backgroundColor = "orange";
  }
  if (lengthPercent >= 80) {
    getLenghthtml.style.color = "red";
    getProgressColor.style.backgroundColor = "red";
  }
  if (lengthPercent == 100) {
    getLenghthtml.style.color = "red";
    getProgressColor.style.backgroundColor = "red";
    getShowMaxLength.innerHTML = `${currentMaxLength} => Nombre de caractères maximum atteint`;
  }
  if (lengthPercent < 50) {
    getLenghthtml.style.color = "green";
    getProgressColor.style.backgroundColor = "green";
  }
  sessionStorage.removeItem("htmlStored");
  let strgCodeAreaValuehtml = JSON.stringify(getCodeAreaValuehtml);
  console.log("json= " + strgCodeAreaValuehtml);
  sessionStorage.setItem("htmlStored", strgCodeAreaValuehtml);
  //let strgCodeAreaValuehtml = toString(getCodeAreaValuehtml);
  //sessionStorage.setItem("htmlStored", strgCodeAreaValuehtml);

  console.log(strgCodeAreaValuehtml);
  getResulthtml.innerHTML = getCodeAreaValuehtml;

  getLenghthtml.innerHTML = CodeArealenghtHtmlFree;
}

let getButDiv = document.getElementById("btDiv");
let getButP = document.getElementById("btP");
let getButButton = document.getElementById("btButton");

getButDiv.addEventListener("click", function () {
  addtag("<div></div>");
});
getButP.addEventListener("click", function () {
  addtag("<p></p>");
});
getButButton.addEventListener("click", function () {
  addtag("<button></button>");
});

function addtag(tag) {
  getCodeAreaHtml.value += tag;
}

/* -- Add CSS -- */

getCodeAreaCss.addEventListener("keyup", addcss);
function addcss() {
  sessionStorage.setItem("autofocus", "css");

  getCodeAreaHtml.removeAttribute("autofocus");
  getCodeAreaJs.removeAttribute("autofocus");
  getCodeAreaCss.setAttribute("autofocus", "");
  let getCodeAreaValuecss = getCodeAreaCss.value;
  console.log(getCodeAreaValuecss);
  //let getResultcss = document.getElementById("resultcss");
  //getResultcss.innerHTML = getCodeAreaValuecss;

  sessionStorage.removeItem("cssStored");
  let strgCodeAreaValueCss = JSON.stringify(getCodeAreaValuecss);
  console.log("json= " + strgCodeAreaValueCss);
  sessionStorage.setItem("cssStored", strgCodeAreaValueCss);
  qryStyle.innerHTML = getCodeAreaValuecss;
}

/* -- Add JS -- */
getCodeAreaJs.addEventListener("keyup", addJs);
function addJs() {
  sessionStorage.setItem("autofocus", "js");

  if (getCodeAreaHtml.getAttribute("autofocus")) {
    getCodeAreaHtml.removeAttribute("autofocus");
  }
  if (getCodeAreaCss.getAttribute("autofocus")) {
    getCodeAreaCss.removeAttribute("autofocus");
  }
  getCodeAreaJs.getAttribute("autofocus", "");

  let getCodeAreaValueJs = getCodeAreaJs.value;
  console.log(getCodeAreaValueJs);

  sessionStorage.removeItem("jsStored");
  let strgCodeAreaValueJs = JSON.stringify(getCodeAreaValueJs);
  console.log("json JS = " + strgCodeAreaValueJs);
  sessionStorage.setItem("jsStored", strgCodeAreaValueJs);

  qryScript.innerHTML = getCodeAreaValueJs;
  window.location.reload();
}

/* -- Modify MAX length --  */
let getLenghtbutton = document.getElementById("lengthbutton");
getLenghtbutton.addEventListener("click", modifyLength);
function modifyLength() {
  console.log("setAttr");
  let CodeArealenghtHtmlFree = getCodeAreaHtml.value.replace(
    /(<([^>]+)>)/gi,
    ""
  ).length;
  let getInputLength = document.getElementById("inputMaxLength").value;
  if (CodeArealenghtHtmlFree <= getInputLength) {
    getCodeAreaHtml.setAttribute("maxlength", getInputLength);
    getShowMaxLength.innerHTML = getInputLength;
    currentMaxLength = parseInt(getInputLength);
  } else {
    alert(`You must enter a value of ${CodeArealenghtHtmlFree} minimun`);
  }
}
