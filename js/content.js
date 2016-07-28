chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});

document.addEventListener('DOMContentLoaded', function() {
chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});