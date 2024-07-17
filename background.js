chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      chrome.tabs.sendMessage(tab.id, { action: "checkVisibility" });
    }
  });
});

chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0].url && tabs[0].url.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "pauseVideo" });
      }
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {
    chrome.tabs.sendMessage(tabId, { action: "checkVisibility" });
  }
});
