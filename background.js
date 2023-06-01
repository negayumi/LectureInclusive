let extensionActive = true;  // Activé par défaut

function toggleExtension(tabId, extensionState) {
  console.log(`Extension ${extensionState ? "activée" : "désactivée"}`);

  if (extensionState) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log('Script injected successfully', results);
      }
    });
  } else {
    chrome.tabs.reload(tabId);
  }
}

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    extensionActive = message.extensionActive;
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let tabId = tabs[0].id;
      toggleExtension(tabId, extensionActive);
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && extensionActive) {
    toggleExtension(tabId, extensionActive);
  }
});
