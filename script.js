"use strict";

// Inject content script
window.addEventListener("load", (event) => {
  chrome.tabs.executeScript(null, { file: "content.js" }, () => {
    connectScript();
  });
});

// Establish the connection
function connectScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({ function: "html" });
    port.onMessage.addListener((response) => {
      console.log(response.data);
      if (response.data) {
        storeData(response.data);
      }
    });
  });
}

//Keep an array of data
let dataArray = [];

if (localStorage.getItem("dataArray")) {
  dataArray = JSON.parse(localStorage.getItem("dataArray"));
}

// Manage data in array
function storeData(text) {
  dataArray.unshift(text);
  if (dataArray.length > 10) {
    dataArray.pop();
  }

  //Set dataArray to Local Storage
  localStorage.setItem("dataArray", JSON.stringify(dataArray));
  displayData();
}

// Traverse dataArray and display boxes
function displayData() {
  let allBoxes = document.querySelectorAll(".box");
  let idx = 0;

  dataArray.forEach(function (text) {
    let elBox = allBoxes[idx];
    elBox.classList.toggle("hidden");
    idx++;
    let elContent = elBox.firstElementChild;
    elContent.textContent = text;
  });

  //trim content callback
  trimContent();
}

displayData();

function trimContent() {
  //Select box-content element
  let elBoxContent = document.querySelectorAll(".box-content");
  elBoxContent.forEach(trimString);
}

//Callback Function that stores replaces extra content with a "..."
function trimString(currentBox) {
  let s = currentBox.textContent;
  if (s.length > 160) {
    currentBox.textContent = s.slice(0, 160) + "...";
  }
}

function drag_handler(ev) {
  console.log(ev.classList);
  console.log(ev.target);
  console.log(ev.target.value);
}

//Copy paste functionality - Clipboard API

let elAllBoxes = document.querySelectorAll(".box");

elAllBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    const idx = Number(box.getAttribute("id"));

    navigator.clipboard.writeText(dataArray[idx]);

    removeActive();
    box.classList.toggle("active");
    console.log(`Content of ${idx} box copied to clipboard`);
  });
});

function removeActive() {
  elAllBoxes.forEach((box) => {
    box.classList.remove("active");
  });
}
