"use strict";

//Establish connection
let port = chrome.runtime.connect({ name: "knock" });

document.addEventListener("copy", copyWork);

function copyWork(ev) {
  let copiedText = document.getSelection().toString();
  console.log(copiedText);

  port.postMessage({ data: copiedText });
}
