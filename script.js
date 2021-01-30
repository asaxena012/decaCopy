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

      storeData(response.data);
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
}

// Traverse dataArray and display boxes
dataArray.forEach(function (text) {
  let elBox = document.querySelector(".hidden");
  let elBoxContent = elBox.firstChild();
});

//Select box-content element
let elContainer = document.querySelector(".container-main");
let elBoxContent = document.querySelectorAll(".box-content");

console.log(elBoxContent);

//Callback Function that stores replaces extra content with a "..."
function trimString(currentBox) {
  let s = currentBox.textContent;
  if (s.length > 160) {
    currentBox.textContent = s.slice(0, 160) + "...";
  }
}

elBoxContent.forEach(trimString);

//let boxHTML = ` <div class="box">
// <div class="box-content" contenteditable="true">
//   Lorem Ipsum is simply dummy text of the printing and typesetting
//   industry. Lorem Ipsum has been the industry's standard dummy text ever
//   since the 1500s, when an unknown printer took a galley of type and
//   scrambled it to
// </div>
// <div class="image-container">
//   <img src="copyImage.png" alt="copy icon image" />
// </div>
// </div>`;

// function displayData(text) {
//   elContainer.innerHTML += boxHTML;
//   document.querySelector(".box-content").textContent = text;
// }
