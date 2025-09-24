// chrome.action.onClicked.addListener(tab => {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//             alert("hello")
//         }
//     })
// })

//probably use this to toggle on/off?
// let enable = false;

// chrome.action.onClicked.addListener((tab) => {
//   enable = enable ? false : true;
//   if (enable) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ["script.js"],
//     });
//   }
//   else {
//     chrome.action.setBadgeTextColor({color: "grey"})
//     chrome.action.setBadgeText({text: "off"})
//   }
// });
