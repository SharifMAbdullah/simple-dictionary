// //probably use this to toggle on/off?

//using the async version to use the sendResponse argument after the listener returns
function handleMessage(request, sender, sendResponse) {
  console.log(`content script sent a message: ${request.content}`);
  setTimeout(() => {
    if (toggle) {
      sendResponse({ response: "off" });      
    } else {
      sendResponse({response: "on"})
    }
  }, 200);
  return true;
}

let toggle = true;
chrome.action.onClicked.addListener(function (tab) {
  if (toggle) {
    toggle = false;
    chrome.action.setBadgeText({
      text: "on",
    });
    chrome.action.setIcon({ path: "images/grayed_128.png" });
  } else {
    toggle = true;
    chrome.action.setBadgeText({
      text: "off",
    });
    chrome.action.setIcon({ path: "images/dictionary_128.png" });
  }
});

chrome.runtime.onMessage.addListener(handleMessage);