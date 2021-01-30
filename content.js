"use strict";

//Getting the connection port
let portMsg;
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.function == "html") {
      portMsg = port;
    }
  });
});

//Posting copied content to the extension script using portMsg
document.addEventListener("copy", copyWork);
function copyWork(ev) {
  let copiedText = document.getSelection().toString();
  portMsg.postMessage({ data: copiedText });
}
