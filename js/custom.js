chrome.browserAction.onClicked.addListener(function(activeTab){
  //change the host address here
  var newURL = "http://localhost:8000/"+"?jobviewurl="+encodeURIComponent(activeTab.url);
  chrome.tabs.create({ url: newURL });
});

