"use strict";

// //Getting the connection port
// let portMsg;
// chrome.runtime.onConnect.addListener((port) => {
//   port.onMessage.addListener((msg) => {
//     if (msg.function == "html") {
//       portMsg = port;
//     }
//   });
// });

var dataArray = [];

chrome.storage.local.get("key", function (result) {
  if (result) {
    dataArray = result.key;
    console.log(dataArray);
  }
});

//Posting copied content to the extension script using portMsg
document.addEventListener("copy", copyWork);
function copyWork(ev) {
  let copiedText = document.getSelection().toString();
  // console.log(copiedText);
  if (copiedText) {
    storeData(copiedText);
  }
}

function storeData(text) {
  dataArray.unshift(text);
  if (dataArray.length > 10) {
    dataArray.pop();
  }

  //Set dataArray to Local Storage
  chrome.storage.local.set({ key: dataArray });
}

// Try using chrome storage
//chrome.storage.local.set({ key: "Aditya is Fucking Awesome" });

console.log("Content Script Loaded");
