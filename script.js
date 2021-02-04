"use strict";

let dataArray = [];

chrome.storage.local.get("key", function (result) {
  if (result.key ?? false) {
    dataArray = result.key;
    console.log(dataArray);
    displayData();
  } else {
    document.querySelector(".home-image").classList.toggle("hidden");
  }
});

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
  if (s.length > 150) {
    currentBox.textContent = s.slice(0, 160) + "...";
  }
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

//Drag and Drop Handlers
function dragstart_handler(ev) {
  this.style.opacity = "0.4";

  const idx = Number(this.getAttribute("id"));
  const text = dataArray[idx];
  ev.dataTransfer.setData("text/plain", text);
}

function dragend_handler(ev) {
  this.style.opacity = "1";
}

// Add listeners (Inline JS not allowed)
elAllBoxes.forEach((currentBox) => {
  currentBox.addEventListener("dragstart", dragstart_handler, false);
  currentBox.addEventListener("dragend", dragend_handler, false);
});

//
